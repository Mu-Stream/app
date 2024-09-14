import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Room} from '../../../src/lib/notifier/room';
import {Peer} from '../../../src/lib/notifier/peer';
import {App} from '../../../src/lib/app';
import {Ok} from 'bakutils-catcher';

vi.mock('$lib/app', () => ({
  App: {
    instance: {
      context: {
        audio_manager: {
          playLocal: vi.fn(),
          stream: 'mock-stream',
        },
      },
    },
  },
}));
vi.stubGlobal('File', vi.fn());
describe('Room', () => {
  let room: Room;
  let mockPeer: Peer;

  beforeEach(() => {
    mockPeer = {
      id: 'peer1',
      username: 'user1',
      send: vi.fn().mockReturnValue(Ok(null)),
      quit: vi.fn(),
    } as unknown as Peer;
    room = new Room();
  });

  it('should initialize with default values', () => {
    expect(room.id).toBeUndefined();
    expect(room.client_peer).toBeUndefined();
    expect(room.members_peers).toEqual([]);
    expect(room.is_client).toBe(false);
  });

  it('should set and get id correctly', () => {
    const notifySpy = vi.spyOn(room as any, '_notify');
    room.id = 'room1';
    expect(room.id).toBe('room1');
    expect(notifySpy).toHaveBeenCalledWith({ type: 'ROOM_ID', id: 'room1' });
  });

  it('should set and get client_peer correctly', () => {
    const notifySpy = vi.spyOn(room as any, '_notify');
    room.client_peer = mockPeer;
    expect(room.client_peer).toBe(mockPeer);
    expect(notifySpy).toHaveBeenCalledWith({ type: 'JOINED', peer: mockPeer });
  });

  it('should notify user list correctly', () => {
    const notifySpy = vi.spyOn(room as any, '_notify');
    const broadcastSpy = vi.spyOn(room, 'broadcast');
    room.addPeer(mockPeer);
    room.notifyUserList();
    expect(notifySpy).toHaveBeenCalledWith({
      type: 'USER_LIST',
      users: [{ id: 'peer1', username: 'user1' }, { id: 'host', username: 'host' }],
    });
    expect(broadcastSpy).toHaveBeenCalledWith({
      type: 'USER_LIST',
      users: [{ id: 'peer1', username: 'user1' }, { id: 'host', username: 'host' }],
    });
  });

  it('should add peer correctly', () => {
    const notifySpy = vi.spyOn(room as any, '_notify');
    room.addPeer(mockPeer);
    expect(room.members_peers).toContain(mockPeer);
    expect(notifySpy).toHaveBeenCalledWith({ type: 'NEW_PEER', peer: mockPeer });
  });

  it('should remove peer correctly', () => {
    const notifySpy = vi.spyOn(room as any, '_notify');
    room.addPeer(mockPeer);
    room.removePeer('peer1');
    expect(room.members_peers).not.toContain(mockPeer);
    expect(notifySpy).toHaveBeenCalledWith({ type: 'PEER_QUIT', id: 'peer1' });
  });

  it('should send event correctly', () => {
    room.client_peer = mockPeer;
    const result = room.send({ type: 'TEST_EVENT' });
    expect(mockPeer.send).toHaveBeenCalledWith({ type: 'TEST_EVENT' });
    expect(result.isOk()).toBe(true);
  });

  it('should broadcast event correctly', () => {
    room.addPeer(mockPeer);
    const result = room.broadcast({ type: 'TEST_EVENT' });
    expect(mockPeer.send).toHaveBeenCalledWith({ type: 'TEST_EVENT' });
    expect(result.isOk()).toBe(true);
  });

  it('should play file and send/broadcast stream event correctly', async () => {
    const file = new File([''], 'test.mp3');
    room.client_peer = mockPeer;
    await room.playFile(file);
    expect(App.instance.context.audio_manager.playLocal).toHaveBeenCalledWith(file);
    expect(mockPeer.send).toHaveBeenCalledWith({
      type: 'ADD_STREAM',
      stream: 'mock-stream',
    });
  });

  it('should quit correctly', () => {
    room.client_peer = mockPeer;
    room.quit();
    expect(mockPeer.quit).toHaveBeenCalled();
  });

  it('should delete correctly', () => {
    room.addPeer(mockPeer);
    room.delete();
    expect(mockPeer.quit).toHaveBeenCalled();
    expect(room.members_peers).toEqual([]);
  });
});