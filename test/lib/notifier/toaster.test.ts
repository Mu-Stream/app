import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getToastStore } from '@skeletonlabs/skeleton';
import { Toaster } from '../../../src/lib/notifier/toaster';

vi.mock('@skeletonlabs/skeleton', () => ({
  getToastStore: vi.fn(() => ({
    trigger: vi.fn(),
  })),
}));

describe('Toaster', () => {
  let toaster: Toaster;
  let mockToastStore: ReturnType<typeof getToastStore>;

  beforeEach(() => {
    toaster = new Toaster();
    mockToastStore = getToastStore();
  });

  it('should initialize the toast store', () => {
    toaster.init(mockToastStore);
    expect(toaster['_toastStore']).toBe(mockToastStore);
  });

  it('should trigger a toast with the correct payload', () => {
    toaster.init(mockToastStore);
    const payload = { message: 'Test message', severity: 'success' as 'success' };
    toaster.trigger(payload);
    expect(mockToastStore.trigger).toHaveBeenCalledWith({
      message: 'Test message',
    });
  });
});
