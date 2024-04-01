import { DefaultCatch, Err, Ok, type Result } from "bakutils-catcher";
import { Command, prettyError } from "./i_commands";
import { UnableToRetrivePeerSignal } from "../errors";
import { Peer, type PeerEvents } from "$lib/notifier/peer";
import type { Listener } from "$lib/notifier/i_notifier";
import type { SignalingEvent } from "$lib/notifier/signaling";
import type { MediaManagerEvents } from "$lib/notifier/audio_manager";

export class HostCommand extends Command {
	private _peer!: Peer

	constructor() { super() }

	@DefaultCatch(prettyError)
	public async execute(): Promise<Result<null, Error>> {
		(await this._signaling_server.is_opened).unwrap()

		this._signaling_server.send({ type: 'HOST' })

		const event = (await this._signaling_server.once('HOST_OK')).unwrap()

		this._room.id = event.roomId;

		this._signaling_server.subscribe('JOIN_OK', this._registerPeer)

		this._audio_manager.subscribe('CURRENTLY_PLAYING', this._broadcastSongProgressToParticipant);

		return Ok(null)
	}

	private _registerPeer: Listener<SignalingEvent['JOIN_OK']> =
		async (payload) => {
			this._peer = new Peer({ initiator: false, username: payload.username })
			this._peer.signal(payload.signal)

			const signal = (await this._peer.initial_signal).unwrap()

			this._signaling_server.send({
				type: 'SIGNAL_REQUESTER',
				signal: signal,
				uuid: payload.uuid,
				username: payload.username,
			})

			if ((await this._peer.link_done).isNone()) return Err(new UnableToRetrivePeerSignal);

			this._peer.send({ type: 'INIT_ROOM', room_id: this._room.id! })

			this._room.members_peers.push(this._peer)

			const current_stream = this._audio_manager.stream

			// there is a current music playing, send it to the new client
			if (current_stream) {
				this._peer.send({ type: 'ADD_STREAM', stream: current_stream })
			}

			this._peer.subscribe('ADD_STREAM', this._broadcastPeerStream)
			this._peer.subscribe('CURRENTLY_PLAYING', this._audio_manager.bind)
			this._peer.subscribe('PAUSE', this._handlePause)
			this._peer.subscribe('RESUME', this._handleResume)

			return Ok(null)
		}

	private _handlePause: Listener<PeerEvents['PAUSE']> =
		async _ => { this._audio_manager.pause(); return Ok(null) }

	private _handleResume: Listener<PeerEvents['RESUME']> =
		async _ => { this._audio_manager.resume(); return Ok(null) }

	private _broadcastPeerStream: Listener<PeerEvents['ADD_STREAM']> =
		async payload => {
			this._audio_manager.playRemote(payload.stream);
			this._room.broadcast(payload, [this._peer.id])
			return Ok(null)
		}

	private _broadcastSongProgressToParticipant: Listener<MediaManagerEvents['CURRENTLY_PLAYING']> =
		async payload => {
			this._room.broadcast(payload)
			return Ok(null)
		}
}
