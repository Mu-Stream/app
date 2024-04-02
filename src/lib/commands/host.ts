import { DefaultCatch, Err, Ok, type Result } from "bakutils-catcher";
import { Command, prettyError, type WrappedListener } from "./i_commands";
import { UnableToRetrivePeerSignal } from "../errors";
import { Peer, type PeerEvents } from "$lib/notifier/peer";
import type { SignalingEvent } from "$lib/notifier/signaling";
import type { AppContext } from "$lib/app";

export class HostCommand extends Command {
	private _peer!: Peer

	@DefaultCatch(prettyError)
	public async execute(context: AppContext): Promise<Result<null, Error>> {

		(await context.signaling_server.is_opened).unwrap()

		context.signaling_server.send({ type: 'HOST' })

		const event = (await context.signaling_server.once('HOST_OK')).unwrap()

		context.room.id = event.roomId;

		context.signaling_server.subscribe('JOIN_OK', this._registerPeer(context))

		return Ok(null)
	}

	private _registerPeer: WrappedListener<AppContext, SignalingEvent['JOIN_OK']> =
		context => async (payload) => {
			this._peer = new Peer({ initiator: false, username: payload.username })
			this._peer.signal(payload.signal)

			const signal = (await this._peer.initial_signal).unwrap()

			context.signaling_server.send({
				type: 'SIGNAL_REQUESTER',
				signal: signal,
				uuid: payload.uuid,
				username: payload.username,
			})

			if ((await this._peer.link_done).isNone()) return Err(new UnableToRetrivePeerSignal);

			this._peer.send({ type: 'INIT_ROOM', room_id: context.room.id! })

			context.room.members_peers.push(this._peer)

			const current_stream = context.audio_manager.stream

			// there is a current music playing, send it to the new client
			if (current_stream) {
				this._peer.send({ type: 'ADD_STREAM', stream: current_stream })
			}

			this._peer.subscribe('ADD_STREAM', this._handlePeerStream(context))
			this._peer.subscribe('PAUSE', this._handlePause(context))
			this._peer.subscribe('RESUME', this._handleResume(context))
			this._peer.subscribe('CURRENTLY_PLAYING', this._handleSongProgressPeer(context));

			this._peer.proxy('CURRENTLY_PLAYING', context.audio_manager.bind)
			return Ok(null)
		}

	private _handlePause: WrappedListener<AppContext, PeerEvents['PAUSE']> =
		context => async event => {
			context.audio_manager.pause();
			context.room.broadcast(event)
			return Ok(null)
		}

	private _handleResume: WrappedListener<AppContext, PeerEvents['RESUME']> =
		context => async event => {
			context.audio_manager.resume();
			context.room.broadcast(event)
			return Ok(null)
		}

	private _handlePeerStream: WrappedListener<AppContext, PeerEvents['ADD_STREAM']> =
		context => async payload => {
			context.audio_manager.playRemote(payload.stream);
			context.room.broadcast(payload, { excluded_ids: [this._peer.id] })
			return Ok(null)
		}

	private _handleSongProgressPeer: WrappedListener<AppContext, PeerEvents['CURRENTLY_PLAYING']> =
		context => async payload => {
			context.room.broadcast(payload, { excluded_ids: [this._peer.id] })
			return Ok(null)
		}
}
