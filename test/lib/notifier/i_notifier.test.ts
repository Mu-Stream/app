import {beforeEach, describe, expect, it, vi} from 'vitest';
import {type Listener, Notifier} from "../../../src/lib/notifier/i_notifier";
import {Ok, type Result} from "bakutils-catcher";

type CustomEvents<K extends string, E extends Record<K, { type: K }>> = E;

type TestEvent = 'TEST_EVENT';
type TestPayload = { type: TestEvent, data: string };
type TestEvents = CustomEvents<TestEvent, { TEST_EVENT: TestPayload }>;

class TestNotifier extends Notifier<TestEvent, TestEvents> {}

describe('Notifier', () => {
  let notifier: TestNotifier;

  beforeEach(() => {
    notifier = new TestNotifier();
  });

  it('should subscribe to an event', () => {
    const listener: Listener<TestPayload> = vi.fn().mockResolvedValue(Ok(null));
    notifier.subscribe('TEST_EVENT', listener);
    expect(notifier['_subscribers'].get('TEST_EVENT')).toContain(listener);
  });


  it('should handle once subscription', async () => {
    const payload: TestPayload = { type: 'TEST_EVENT', data: 'test' };
    const result = notifier.once('TEST_EVENT');
    notifier['_notify'](payload);
    expect(resultsAreEqual(await result, Ok(payload))).toBe(true);
  });

  function resultsAreEqual<T, E>(actual: Result<T, E>, expected: Result<T, E>): boolean {
    return actual.isOk() === expected.isOk() &&
        actual.isErr() === expected.isErr() &&
        JSON.stringify(actual?.value) === JSON.stringify(expected?.value);
  }

  it('should notify listeners', async () => {
    const listener: Listener<TestPayload> = vi.fn().mockResolvedValue(Ok(null));
    notifier.subscribe('TEST_EVENT', listener);
    const payload: TestPayload = { type: 'TEST_EVENT', data: 'test' };
    await notifier['_notify'](payload);
    expect(listener).toHaveBeenCalledWith(payload);
  });

  it('should create a readable store', () => {
    const payload: TestPayload = { type: 'TEST_EVENT', data: 'test' };
    notifier = new TestNotifier({ readable_default_values: { TEST_EVENT: payload } });
    const store = notifier.readable('TEST_EVENT');
    let storeValue;
    store.subscribe(value => storeValue = value);
    expect(storeValue).toEqual(payload);
  });
});