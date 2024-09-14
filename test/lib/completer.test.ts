import { describe, expect, it } from 'vitest';
import { None, Option, Some } from 'bakutils-catcher';
import { Completer } from '../../src/lib/completer';

describe('Completer', () => {
  it('should resolve with the correct value using complete method', async () => {
    const completer = new Completer<number>();
    completer.complete(Some(42));
    const result = await completer.future;
    expect(resultsAreEqual(result, Some(42))).toBe(true);
    expect(completer.isCompleted).toBe(true);
  });

  it('should resolve with the correct value using completeValue method', async () => {
    const completer = new Completer<number>();
    completer.completeValue(42);
    const result = await completer.future;
    expect(resultsAreEqual(result, Some(42))).toBe(true);
  });

  it('should resolve with None if timeout is reached', async () => {
    const completer = new Completer<number>({ timeout: Some(100) });
    const result = await completer.future;
    expect(result).toEqual(None);
    expect(completer.isCompleted).toBe(false);
  });

  it('should not resolve with None if completed before timeout', async () => {
    const completer = new Completer<number>({ timeout: Some(100) });
    completer.complete(Some(42));
    const result = await completer.future;
    expect(resultsAreEqual(result, Some(42))).toBe(true);
    expect(completer.isCompleted).toBe(true);
  });

  function resultsAreEqual<T, E>(actual: Option<T>, expected: Option<T>): boolean {
    return JSON.stringify(actual) === JSON.stringify(expected);
  }
});
