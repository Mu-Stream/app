import { describe, expect, it } from 'vitest';
import { formatSeconds } from '../../src/lib/duration_formatter';

describe('formatSeconds', () => {
  it.each([
    [0, '0:00'],
    [59, '0:59'],
    [60, '1:00'],
    [61, '1:01'],
    [3599, '59:59'],
    [3600, '60:00'],
  ])('should format %i seconds as "%s"', (input, expected) => {
    expect(formatSeconds(input)).toBe(expected);
  });
});
