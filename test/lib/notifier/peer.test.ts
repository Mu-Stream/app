import { beforeEach, describe, expect, it, vi } from 'vitest';
import SimplePeer from 'simple-peer';
import { Peer } from '../../../src/lib/notifier/peer';

vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('mocked-uuid'),
}));

vi.mock('simple-peer', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      once: vi.fn(),
      on: vi.fn(),
      signal: vi.fn(),
      send: vi.fn(),
      destroy: vi.fn(),
      addStream: vi.fn(),
    })),
  };
});
vi.stubGlobal('MediaStream', vi.fn());
describe('Peer', () => {
  let peer: Peer;

  beforeEach(() => {
    peer = new Peer({ initiator: true, username: 'test-user' });
  });

  it('should initialize with default values', () => {
    expect(peer.id).toBe('mocked-uuid');
    expect(peer.username).toBe('test-user');
    expect(peer.initial_signal).toBeInstanceOf(Promise);
    expect(peer.link_done).toBeInstanceOf(Promise);
  });

  it('should call signal on SimplePeer instance', () => {
    const signalData: SimplePeer.SignalData = { type: 'offer', sdp: 'dummy-sdp' };
    peer.signal(signalData);
    expect(peer['_peer'].signal).toHaveBeenCalledWith(signalData);
  });

  it('should proxy events correctly', () => {
    const handler = vi.fn();
    peer.hookPluginEvents('INIT_ROOM', handler); // Use a valid PeerEventTypes value
    expect(peer['_proxy_events'].get('INIT_ROOM')).toBe(handler);
  });

  it('should call destroy on SimplePeer instance', () => {
    peer.quit();
    expect(peer['_peer'].destroy).toHaveBeenCalled();
  });

  it('should send payload correctly', () => {
    const payload = { type: 'TEST_EVENT', data: 'test' };
    const result = peer.send(payload);
    expect(peer['_peer'].send).toHaveBeenCalledWith(JSON.stringify({ ...payload, identity: 'mocked-uuid' }));
    expect(result.isOk()).toBe(true);
  });

  it('should handle ADD_STREAM payload correctly', () => {
    const stream = new MediaStream();
    const payload = { type: 'ADD_STREAM', stream };
    const result = peer.send(payload);
    expect(peer['_peer'].addStream).toHaveBeenCalledWith(stream);
    expect(result.isOk()).toBe(true);
  });
});
