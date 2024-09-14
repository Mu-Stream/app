import { describe, expect, it, vi } from 'vitest';
import { Ok } from 'bakutils-catcher';
import { SyncCurrentMetadata } from '../../../src/lib/commands/sync_current_metadata';
import type { AudioManagerEvent } from '../../../src/lib/notifier/audio_manager';

describe('SyncCurrentMetadata', () => {
  it('should execute and sync current metadata correctly', async () => {
    const mockEvent: AudioManagerEvent['CURRENTLY_METADATA'] = {
      type: 'CURRENTLY_METADATA',
      title: '',
      artist: '',
      album: '',
      year: '',
      img: [],
    };
    const mockContext = {
      room: {
        send: vi.fn().mockReturnValue(Ok(null)),
        broadcast: vi.fn().mockReturnValue(Ok(null)),
      },
      audio_manager: {
        syncCurrentMetadata: vi.fn(),
      },
    };

    const command = new SyncCurrentMetadata(mockEvent);
    const result = await command.execute(mockContext as any);

    expect(mockContext.room.send).toHaveBeenCalledWith(mockEvent);
    expect(mockContext.room.broadcast).toHaveBeenCalledWith(mockEvent);
    expect(mockContext.audio_manager.syncCurrentMetadata).toHaveBeenCalledWith(mockEvent);
    expect(result.isOk()).toBe(true);
  });
});
