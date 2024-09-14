import { describe, expect, it, vi } from 'vitest';
import { Ok } from 'bakutils-catcher';
import { ResumeCommand } from '../../../src/lib/commands/resume';

describe('ResumeCommand', () => {
  it('should execute and send resume command correctly', async () => {
    const mockContext = {
      room: {
        send: vi.fn().mockReturnValue(Ok(null)),
        broadcast: vi.fn().mockReturnValue(Ok(null)),
      },
      audio_manager: {
        resume: vi.fn(),
      },
    };

    const command = new ResumeCommand();
    const result = await command.execute(mockContext as any);

    expect(mockContext.room.send).toHaveBeenCalledWith({ type: 'RESUME' });
    expect(mockContext.room.broadcast).toHaveBeenCalledWith({ type: 'RESUME' });
    expect(mockContext.audio_manager.resume).toHaveBeenCalled();
    expect(result.isOk()).toBe(true);
  });
});
