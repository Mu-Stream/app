import { describe, expect, it, vi } from 'vitest';
import { QuitCommand } from '../../../src/lib/commands/quit';

describe('QuitCommand', () => {
  it('should execute and quit room if client', async () => {
    const mockContext = {
      room: {
        is_client: true,
        quit: vi.fn(),
        delete: vi.fn(),
      },
      audio_manager: {
        stop: vi.fn(),
      },
    };
    Object.defineProperty(global, 'window', {
      value: { location: { reload: vi.fn() } },
      writable: true,
    });

    const command = new QuitCommand();
    const result = await command.execute(mockContext as any);

    expect(mockContext.room.quit).toHaveBeenCalled();
    expect(mockContext.room.delete).not.toHaveBeenCalled();
    expect(mockContext.audio_manager.stop).toHaveBeenCalled();
    expect(global.window.location.reload).toHaveBeenCalled();
    expect(result.isOk()).toBe(true);
  });

  it('should execute and delete room if not client', async () => {
    const mockContext = {
      room: {
        is_client: false,
        quit: vi.fn(),
        delete: vi.fn(),
      },
      audio_manager: {
        stop: vi.fn(),
      },
    };
    Object.defineProperty(global, 'window', {
      value: { location: { reload: vi.fn() } },
      writable: true,
    });

    const command = new QuitCommand();
    const result = await command.execute(mockContext as any);

    expect(mockContext.room.quit).not.toHaveBeenCalled();
    expect(mockContext.room.delete).toHaveBeenCalled();
    expect(mockContext.audio_manager.stop).toHaveBeenCalled();
    expect(global.window.location.reload).toHaveBeenCalled();
    expect(result.isOk()).toBe(true);
  });
});
