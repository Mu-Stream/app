import { Err, Ok, type Result } from "bakutils-catcher";
import { Command } from "./i_commands";
import { SignalingServerNotReady } from "../errors";
import { Peer } from "$lib/notifier/peer";

export class JoinRoomCommand extends Command {
	constructor(private room_id: string, private username: string) {
		super();
	}

	async execute(): Promise<Result<null, Error>> {
		const opened = await this._signaling_server.is_opened;

		if (opened.isNone()) return Err(new SignalingServerNotReady);

		const peer = new Peer({ initiator: true, username: this.username })

		const own_signal = (await peer.initial_signal).unwrap()
		this._signaling_server.send({
			type: 'JOIN_HOST',
			roomId: this.room_id,
			signal: own_signal
		})

		const host_signal =
			(await this._signaling_server.once('SIGNAL_REQUESTER')).unwrap()
		peer.signal(host_signal.signal)

		const init_room_res = (await peer.once('INIT_ROOM')).unwrap()
		this._room.id = init_room_res.room_id;

		// when host send a stream
		peer.subscribe('ADD_STREAM', async payload => {
			/// play the stream
			this._audio_manager.playRemote(payload.stream)
			/// re-broadcast to all clients
			this._room.broadcast(payload, [peer.id])
			return Ok(null)
		})

		// bind host currently playing event to the audio manager
		// who will notify the view about it
		peer.subscribe('CURRENTLY_PLAYING', this._audio_manager.bind);

		this._room.client_peer = peer;

		return Ok(null)
	}
}
