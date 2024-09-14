import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SignalingServer } from '../../../src/lib/notifier/signaling';
import { App } from '../../../src/lib/app';

vi.mock('$lib/app', () => ({
  App: {
    instance: {
      context: {
        toaster: {
          trigger: vi.fn(),
        },
      },
    },
  },
}));
vi.mock('$env/static/public', () => ({
  PUBLIC_SIGNALING_SERVER_URL: 'ws://mocked-url',
}));
describe('SignalingServer', () => {
  let signalingServer: SignalingServer;
  let mockWebSocket: WebSocket;

  beforeEach(() => {
    mockWebSocket = {
      send: vi.fn(),
      close: vi.fn(),
      onopen: vi.fn(),
      onerror: vi.fn(),
      onmessage: vi.fn(),
    } as unknown as WebSocket;

    global.WebSocket = vi.fn(() => mockWebSocket) as unknown as typeof WebSocket;

    signalingServer = new SignalingServer();
  });

  it('should initialize with default values', () => {
    expect(signalingServer.is_opened).toBeInstanceOf(Promise);
  });

  it('should set up WebSocket and handle events correctly in init', async () => {
    signalingServer.init();
    expect(global.WebSocket).toHaveBeenCalledWith('ws://mocked-url');
  });

  it('should attempt to reconnect and update state correctly', async () => {
    const reconnectSpy = vi.spyOn(signalingServer, 'reconnect');
    signalingServer.init();
    if (mockWebSocket.onerror) mockWebSocket.onerror(new Event('error'));
    await signalingServer.is_opened;
    expect(reconnectSpy).toHaveBeenCalled();
    expect(App.instance.context.toaster.trigger).toHaveBeenCalledWith({
      message: expect.stringContaining('Unable to connect to server retrying in'),
    });
  });

  it('should send payload through WebSocket', () => {
    const payload = { type: 'HOST' } as const;
    signalingServer.send(payload);
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(payload));
  });

  it('should return correct future state for is_opened', () => {
    expect(signalingServer.is_opened).toBeInstanceOf(Promise);
  });
});
