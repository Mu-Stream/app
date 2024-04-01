import { DefaultCatch, Err, Ok, type Result } from "bakutils-catcher";
import { Command, prettyError } from "./i_commands";
import { SignalingServerNotReady } from "../errors";
import { Peer, type PeerEvents } from "$lib/notifier/peer";
import type { Listener } from "$lib/notifier/i_notifier";

export class JoinRoomCommand extends Command {
	private _peer!: Peer

	constructor(private room_id: string, private username: string) {
		super();
	}

	@DefaultCatch(prettyError)
	async execute(): Promise<Result<null, Error>> {
		const opened = await this._signaling_server.is_opened;

		if (opened.isNone()) return Err(new SignalingServerNotReady);

		this._peer = new Peer({ initiator: true, username: this.username })

		const own_signal = (await this._peer.initial_signal).unwrap()
		this._signaling_server.send({
			type: 'JOIN_HOST',
			roomId: this.room_id,
			signal: own_signal
		})

		const host_signal =
			(await this._signaling_server.once('SIGNAL_REQUESTER')).unwrap()
		this._peer.signal(host_signal.signal)

		const init_room_res = (await this._peer.once('INIT_ROOM')).unwrap()
		this._room.id = init_room_res.room_id;

		// when host send a stream
		this._peer.subscribe('ADD_STREAM', async payload => {
			/// play the stream
			this._audio_manager.playRemote(payload.stream)
			/// re-broadcast to all clients
			this._room.broadcast(payload, { excluded_ids: [this._peer.id] })
			return Ok(null)
		})

		this._peer.subscribe('CURRENTLY_PLAYING', this._room.bind);
		this._peer.subscribe('PAUSE', this._handlePause)
		this._peer.subscribe('RESUME', this._handleResume)

		this._room.client_peer = this._peer;

		return Ok(null)
	}

	private _handlePause: Listener<PeerEvents['PAUSE']> =
		async _ => { this._audio_manager.pause(); return Ok(null) }

	private _handleResume: Listener<PeerEvents['RESUME']> =
		async _ => { this._audio_manager.resume(); return Ok(null) }
}
