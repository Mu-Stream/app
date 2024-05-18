import { DefaultCatch, Err, Ok, type Result } from 'bakutils-catcher';
import { Command, type WrappedListener } from './i_commands';
import { SignalingServerNotReady } from '../errors';
import { Peer, type PeerEvents, type WithPeerIentity } from '$lib/notifier/peer';
import type { CoreAppContext } from '$lib/app';
import { prettyError } from '$lib/logging_utils';
import type { AudioManagerEvent } from '$lib/notifier/audio_manager';

export class JoinRoomCommand extends Command<CoreAppContext> {
	private _peer!: Peer;

	constructor(
		private room_id: string,
		private username: string
	) {
		super();
	}

	@DefaultCatch(prettyError)
	async execute(context: CoreAppContext): Promise<Result<null, Error>> {
		const opened = await context.signaling_server.is_opened;

		if (opened.isNone()) return Err(new SignalingServerNotReady());

		this._peer = new Peer({ initiator: true, username: this.username });

		const own_signal = (await this._peer.initial_signal).unwrap();
		context.signaling_server.send({
			type: 'JOIN_HOST',
			room_id: this.room_id,
			username: this.username,
			signal: own_signal,
		});

		const host_signal = (await context.signaling_server.once('SIGNAL_REQUESTER')).unwrap();
		this._peer.signal(host_signal.signal);

		const init_room_res = (await this._peer.once('INIT_ROOM')).unwrap();
		context.room.id = init_room_res.room_id;

		this._peer.proxy('CURRENTLY_PLAYING', context.audio_manager.bind);

		this._peer.subscribe('ADD_STREAM', this._handleStream(context));
		this._peer.subscribe('PAUSE', this._handlePause(context));
		this._peer.subscribe('RESUME', this._handleResume(context));
		this._peer.subscribe('USER_LIST', context.room.bind);
		this._peer.subscribe('CURRENTLY_METADATA', this._handleCurrentMetadata(context));

		context.room.client_peer = this._peer;

		return Ok(null);
	}

	private _handleStream: WrappedListener<CoreAppContext, WithPeerIentity<PeerEvents['ADD_STREAM']>> =
		context => async payload => {
			/// play the stream
			context.audio_manager.playRemote(payload.stream);
			/// re-broadcast to all clients
			context.room.broadcast(payload, { excluded_ids: [this._peer.id] });
			return Ok(null);
		};

	private _handlePause: WrappedListener<CoreAppContext, WithPeerIentity<PeerEvents['PAUSE']>> = context => async _ => {
		context.audio_manager.pause();
		return Ok(null);
	};

	private _handleResume: WrappedListener<CoreAppContext, WithPeerIentity<PeerEvents['RESUME']>> =
		context => async _ => {
			context.audio_manager.resume();
			return Ok(null);
		};

	private _handleCurrentMetadata: WrappedListener<CoreAppContext, WithPeerIentity<AudioManagerEvent['CURRENTLY_METADATA']>> =
		context => async event => {
			context.audio_manager.syncCurrentMetadata(event);
			return Ok(null);
		};

}
