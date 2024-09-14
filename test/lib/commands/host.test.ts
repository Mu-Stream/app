import {beforeEach, describe, expect, it, vi} from 'vitest';

import {Ok} from 'bakutils-catcher';
import {HostCommand} from "../../../src/lib/commands/host";

describe('HostCommand', () => {
  let context: any;
  let hostCommand: HostCommand;

  beforeEach(() => {
    context = {
      signaling_server: {
        is_opened: Promise.resolve(Ok(true)),
        send: vi.fn(),
        once: vi.fn().mockResolvedValue(Ok({ room_id: 'room123' })),
        subscribe: vi.fn(),
      },
      room: {
        id: null,
        broadcast: vi.fn(),
        addPeer: vi.fn(),
        removePeer: vi.fn(),
        notifyUserList: vi.fn(),
      },
      audio_manager: {
        stream: 'stream123',
        pause: vi.fn(),
        resume: vi.fn(),
        playRemote: vi.fn(),
        syncCurrentMetadata: vi.fn(),
        bind: vi.fn(),
        readable: vi.fn().mockReturnValue({ subscribe: vi.fn() }),
      },
      toaster: {
        trigger: vi.fn(),
      },
    };

    hostCommand = new HostCommand();
  });

  it('should execute correctly', async () => {
    const result = await hostCommand.execute(context);
    expect(result.type).toEqual("ok");
    expect(context.signaling_server.send).toHaveBeenCalledWith({ type: 'HOST' });
    expect(context.signaling_server.subscribe).toHaveBeenCalledWith('JOIN_OK', expect.any(Function));
  });


  it('should handle pause event correctly', async () => {
    const handlePause = hostCommand['_handlePause'](context);
    const event = { type: 'PAUSE' };
    const result = await handlePause(event);
    expect(result.type).toEqual("ok");
    expect(context.audio_manager.pause).toHaveBeenCalled();
    expect(context.room.broadcast).toHaveBeenCalledWith(event);
  });

  it('should handle resume event correctly', async () => {
    const handleResume = hostCommand['_handleResume'](context);
    const event = { type: 'RESUME' };
    const result = await handleResume(event);
    expect(result.type).toEqual("ok");
    expect(context.audio_manager.resume).toHaveBeenCalled();
    expect(context.room.broadcast).toHaveBeenCalledWith(event);
  });


  it('should handle user list event correctly', async () => {
    const handleUserList = hostCommand['_handleUserList'](context);
    const result = await handleUserList({});
    expect(result.type).toEqual("ok");
    expect(context.room.notifyUserList).toHaveBeenCalled();
  });


  it('should handle toast event correctly', async () => {
    const handleToast = hostCommand['_handleToast'](context);
    const event = { type: 'TOAST', severity: 'info', message: 'Test message' };
    const result = await handleToast(event);
    expect(result.type).toEqual("ok");
    expect(context.toaster.trigger).toHaveBeenCalledWith(event);
  });

  it('should handle current metadata event correctly', async () => {
    const handleCurrentMetadata = hostCommand['_handleCurrentMetadata'](context);
    const event = { type: 'CURRENTLY_METADATA' };
    const result = await handleCurrentMetadata(event);
    expect(result.type).toEqual("ok");
    expect(context.audio_manager.syncCurrentMetadata).toHaveBeenCalledWith(event);
  });
});