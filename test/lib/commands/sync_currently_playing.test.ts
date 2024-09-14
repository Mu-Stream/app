import { describe, expect, it, vi } from 'vitest';
import { Ok } from 'bakutils-catcher';
import { SyncCurrentlyPlaying } from '../../../src/lib/commands/sync_currently_playing';
import type { AudioManagerEvent } from '../../../src/lib/notifier/audio_manager';

describe('SyncCurrentlyPlaying', () => {
  it('should execute and sync currently playing correctly', async () => {
    const mockEvent: AudioManagerEvent['CURRENTLY_PLAYING'] = {
      type: 'CURRENTLY_PLAYING',
      total_time: 15,
      current_time: 12,
      status: 'PLAYING',
    };
    const mockContext = {
      room: {
        send: vi.fn().mockReturnValue(Ok(null)),
        broadcast: vi.fn().mockReturnValue(Ok(null)),
      },
    };

    const command = new SyncCurrentlyPlaying(mockEvent);
    const result = await command.execute(mockContext as any);

    expect(mockContext.room.send).toHaveBeenCalledWith(mockEvent);
    expect(mockContext.room.broadcast).toHaveBeenCalledWith(mockEvent);
    expect(result.isOk()).toBe(true);
  });
});
