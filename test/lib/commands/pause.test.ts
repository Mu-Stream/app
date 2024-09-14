import {Ok} from 'bakutils-catcher';
import {describe, expect, it, vi} from 'vitest';
import {PauseCommand} from "../../../src/lib/commands/pause";

describe('PauseCommand', () => {
  it('should execute and send pause command correctly', async () => {
    const mockContext = {
      room: {
        send: vi.fn().mockReturnValue(Ok(null)),
        broadcast: vi.fn().mockReturnValue(Ok(null)),
      },
      audio_manager: {
        pause: vi.fn(),
      },
    };

    const command = new PauseCommand();
    const result = await command.execute(mockContext as any);

    expect(mockContext.room.send).toHaveBeenCalledWith({ type: 'PAUSE' });
    expect(mockContext.room.broadcast).toHaveBeenCalledWith({ type: 'PAUSE' });
    expect(mockContext.audio_manager.pause).toHaveBeenCalled();
    expect(result.isOk()).toBe(true);
  });
});