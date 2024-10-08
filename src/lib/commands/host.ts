import { DefaultCatch, Err, Ok, type Result } from 'bakutils-catcher';
import { Command, type WrappedListener } from './i_commands';
import { UnableToRetrivePeerSignal } from '../errors';
import { Peer, type PeerEvents, type WithPeerIentity } from '$lib/notifier/peer';
import type { SignalingEvent } from '$lib/notifier/signaling';
import type { CoreAppContext } from '$lib/app';
import { prettyError } from '$lib/logging_utils';
import type { AudioManagerEvent } from '$lib/notifier/audio_manager';
import { get } from 'svelte/store';
import LL from '../../i18n/i18n-svelte';

export class HostCommand extends Command<CoreAppContext> {
  private _peer!: Peer;

  @DefaultCatch(prettyError)
  public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
    (await context.signaling_server.is_opened).unwrap();

    context.signaling_server.send({ type: 'HOST' });

    const event = (await context.signaling_server.once('HOST_OK')).unwrap();

    context.room.id = event.room_id;

    context.signaling_server.subscribe('JOIN_OK', this._registerPeer(context));

    return Ok(null);
  }

  private _registerPeer: WrappedListener<CoreAppContext, SignalingEvent['JOIN_OK']> = context => async payload => {
    this._peer = new Peer({ initiator: false, username: payload.username });
    this._peer.signal(payload.signal);

    const signal = (await this._peer.initial_signal).unwrap();

    context.signaling_server.send({
      type: 'SIGNAL_REQUESTER',
      signal: signal,
      uuid: payload.uuid,
    });

    if ((await this._peer.link_done).isNone()) return Err(new UnableToRetrivePeerSignal());

    this._peer.send({ type: 'INIT_ROOM', room_id: context.room.id!, peer_id: this._peer.id });

    const current_stream = context.audio_manager.stream;

    // there is a current music playing, send it to the new client
    if (current_stream) {
      this._peer.send({ type: 'ADD_STREAM', stream: current_stream });
    }

    this._peer.subscribe('ADD_STREAM', this._handlePeerStream(context));
    this._peer.subscribe('PAUSE', this._handlePause(context));
    this._peer.subscribe('RESUME', this._handleResume(context));
    this._peer.subscribe('CURRENTLY_PLAYING', this._handleSongProgressPeer(context));
    this._peer.subscribe('USER_LIST', this._handleUserList(context));
    this._peer.subscribe('CLOSE', this._handleClose(context));
    this._peer.subscribe('TOAST', this._handleToast(context));
    this._peer.subscribe('CURRENTLY_METADATA', this._handleCurrentMetadata(context));

    this._peer.proxy('CURRENTLY_PLAYING', context.audio_manager.bind);
    this._peer.proxy('SONG_ENDED', context.audio_manager.bind);

    const new_peer_toast: PeerEvents['TOAST'] = {
      type: 'TOAST',
      severity: 'success',
      message: get(LL).alertToast.newParticipant({ name: this._peer.username }),
    };
    context.room.broadcast(new_peer_toast);
    context.toaster.trigger(new_peer_toast);

    context.room.addPeer(this._peer);

    const { localImg, ...meta_payload } = get(context.audio_manager.readable('CURRENTLY_METADATA'));
    this._peer.send(meta_payload);
    if (localImg) {
      this._peer.sendFile(localImg, 'current-metadata');
    }

    return Ok(null);
  };

  private _handlePause: WrappedListener<CoreAppContext, PeerEvents['PAUSE']> = context => async event => {
    context.audio_manager.pause();
    context.room.broadcast(event);
    return Ok(null);
  };

  private _handleResume: WrappedListener<CoreAppContext, PeerEvents['RESUME']> = context => async event => {
    context.audio_manager.resume();
    context.room.broadcast(event);
    return Ok(null);
  };

  private _handlePeerStream: WrappedListener<CoreAppContext, PeerEvents['ADD_STREAM']> = context => async payload => {
    context.audio_manager.playRemote(payload.stream);
    context.room.broadcast(payload, { excluded_ids: [this._peer.id] });
    return Ok(null);
  };

  private _handleSongProgressPeer: WrappedListener<CoreAppContext, AudioManagerEvent['CURRENTLY_PLAYING']> =
    context => async payload => {
      context.room.broadcast(payload, { excluded_ids: [this._peer.id] });
      return Ok(null);
    };

  private _handleUserList: WrappedListener<CoreAppContext, WithPeerIentity<PeerEvents['USER_LIST']>> =
    context => async _ => {
      context.room.notifyUserList();
      return Ok(null);
    };

  private _handleClose: WrappedListener<CoreAppContext, WithPeerIentity<PeerEvents['CLOSE']>> = context => async _ => {
    context.room.removePeer(this._peer.id);
    const payload: PeerEvents['TOAST'] = {
      type: 'TOAST',
      severity: 'success',
      message: get(LL).alertToast.participantLeft({ name: this._peer.username }),
    };
    context.toaster.trigger(payload);
    context.room.broadcast(payload);
    return Ok(null);
  };

  private _handleToast: WrappedListener<CoreAppContext, WithPeerIentity<PeerEvents['TOAST']>> =
    context => async event => {
      context.toaster.trigger(event);
      return Ok(null);
    };

  private _handleCurrentMetadata: WrappedListener<
    CoreAppContext,
    WithPeerIentity<AudioManagerEvent['CURRENTLY_METADATA']>
  > = context => async event => {
    if (event.hasImg && !event.localImg) {
      event.localImg = (await context.room.reciveFile('current-metadata', event.identity)).unwrap();
    }
    context.audio_manager.syncCurrentMetadata(event);
    return Ok(null);
  };
}
