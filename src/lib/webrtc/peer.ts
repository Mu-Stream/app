import { Completer } from '$lib/completer';
import { v4 } from 'uuid'
import SimplePeer from 'simple-peer'
import { Err, Ok, type Result } from 'bakutils-catcher';
import { Notifier, NotifierError } from '$lib/i_notifier';

export enum PeerPayloadType {
	RENEGOCIATE = 'RENEGOCIATE',
	INIT_ROOM = 'INIT_ROOM',
	ADD_STREAM = 'ADD_STREAM',
}

export type PeerPayloads = {
	[PeerPayloadType.INIT_ROOM]: {
		type: PeerPayloadType.INIT_ROOM;
		room_id: string;
	},
	[PeerPayloadType.RENEGOCIATE]: {
		type: PeerPayloadType.RENEGOCIATE;
		signal: SimplePeer.SignalData;
	},
	[PeerPayloadType.ADD_STREAM]: {
		type: PeerPayloadType.ADD_STREAM;
		stream: MediaStream;
	}
}

export class PeerNotifier extends Notifier<PeerPayloadType, PeerPayloads> {
	private _id = v4();
	private _peer: SimplePeer.Instance;

	private _initial_signal: Completer<SimplePeer.SignalData> = new Completer()
	private _link_done: Completer<true> = new Completer()

	public get id() { return this._id }
	public get initial_signal() { return this._initial_signal.future }
	public get link_done() { return this._link_done.future }

	constructor({ initiator }: { initiator: boolean }) {
		super()
		this._peer = new SimplePeer({ initiator, trickle: false });
		this._peer.once("signal", (singal) => this._initial_signal.completeValue(singal))
		this._peer.once("connect", () => this._link_done.completeValue(true))

		// when first connection is established
		this._link_done.future.then(done =>
			done.match({
				Some: _ => {

					// setup renegociation flow
					this._peer.on("signal", signal => this.send({
						type: PeerPayloadType.RENEGOCIATE,
						signal
					}));
					this.subscribe(PeerPayloadType.RENEGOCIATE, async payload => {
						this._peer.signal(payload.signal);
						return Ok(null)
					})

					// start notifying Peer to Peer text payload
					this._peer.on("data", data => this._notify(JSON.parse(data)))

					// handle incoming Peer to Peer stream payload
					this._peer.on("stream", stream => this._notify({
						type: PeerPayloadType.ADD_STREAM,
						stream
					}));
				},
				None: () => { throw new Error("TBD") }
			})
		)
	}

	public signal(signal: SimplePeer.SignalData) {
		this._peer.signal(signal);
	}

	public send(payload: PeerPayloads[PeerPayloadType]): Result<null, NotifierError> {
		try {
			// handle special ADD_STREAM payload as it's not a text payload 
			if (payload.type === PeerPayloadType.ADD_STREAM) {
				this._peer.addStream(payload.stream);
				return Ok(null);
			}
			this._peer!.send(JSON.stringify(payload))
			return Ok(null)
		} catch (err) {
			return Err(new NotifierError((err as Error).message))
		}
	}
}
