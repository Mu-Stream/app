import { describe, expect, it } from 'vitest';
import { EventTimeout, SignalingServerNotReady, UnableToRetrivePeerSignal } from '../../src/lib/errors';

describe('Error Classes', () => {
  it('should create SignalingServerNotReady error with correct message', () => {
    const error = new SignalingServerNotReady();
    expect(error.message).toBe('Signaling Server not ready');
  });

  it('should create EventTimeout error with correct message and event name', () => {
    const error = new EventTimeout('testEvent');
    expect(error.message).toBe('Event testEvent timed out');
  });

  it('should create EventTimeout error with correct message and unknown event name', () => {
    const error = new EventTimeout();
    expect(error.message).toBe('Event unkown timed out');
  });

  it('should create UnableToRetrivePeerSignal error with correct message', () => {
    const error = new UnableToRetrivePeerSignal();
    expect(error.message).toBe('Unable to retrive peer signal');
  });
});
