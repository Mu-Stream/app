import { describe, expect, it, vi } from 'vitest';
import { Ok } from 'bakutils-catcher';
import { JoinRoomCommand } from '../../../src/lib/commands/join';

describe('JoinRoomCommand', () => {
  const mockContext = {
    signaling_server: {
      is_opened: Promise.resolve(Ok(true)),
      send: vi.fn(),
      type: 'JOIN_HOST',
      room_id: 'room1',
      username: 'user1',
      signal: 'own_signal',
    },
    once: vi.fn().mockResolvedValue(Ok({ signal: 'host_signal' })),
    room: {
      id: '',
      client_peer: null,
      broadcast: vi.fn(),
      bind: vi.fn(),
      quit: vi.fn(),
    },
    audio_manager: {
      playRemote: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      syncCurrentMetadata: vi.fn(),
      bind: vi.fn(),
    },
    toaster: {
      trigger: vi.fn(),
    },
  };

  it('should initialize with correct room_id and username', () => {
    const command = new JoinRoomCommand('room1', 'user1');
    expect(command['room_id']).toBe('room1');
    expect(command['username']).toBe('user1');
  });

  it('should handle pause correctly', async () => {
    const command = new JoinRoomCommand('room1', 'user1');
    const result = await command['_handlePause'](mockContext as any)({});
    expect(result.isOk()).toBe(true);
    expect(mockContext.audio_manager.pause).toHaveBeenCalled();
  });

  it('should handle resume correctly', async () => {
    const command = new JoinRoomCommand('room1', 'user1');
    const result = await command['_handleResume'](mockContext as any)({});
    expect(result.isOk()).toBe(true);
    expect(mockContext.audio_manager.resume).toHaveBeenCalled();
  });

  it('should handle current metadata correctly', async () => {
    const command = new JoinRoomCommand('room1', 'user1');
    const event = { metadata: 'metadata' };
    const result = await command['_handleCurrentMetadata'](mockContext as any)(event);
    expect(result.isOk()).toBe(true);
    expect(mockContext.audio_manager.syncCurrentMetadata).toHaveBeenCalledWith(event);
  });

  it('should handle close correctly', async () => {
    Object.defineProperty(global, 'window', {
      value: Object.create(global),
      writable: true,
    });
    Object.defineProperty(global.window, 'location', {
      value: {
        reload: vi.fn(),
      },
      writable: true,
    });

    const command = new JoinRoomCommand('room1', 'user1');
    const result = await command['_handleClose'](mockContext as any)({});
    expect(result.isOk()).toBe(true);
    expect(mockContext.room.quit).toHaveBeenCalled();
    expect(global.window.location.reload).toHaveBeenCalled();
  });

  it('should handle toast correctly', async () => {
    const command = new JoinRoomCommand('room1', 'user1');
    const event = { message: 'toast message' };
    const result = await command['_handleToast'](mockContext as any)(event);
    expect(result.isOk()).toBe(true);
    expect(mockContext.toaster.trigger).toHaveBeenCalledWith(event);
  });
});
