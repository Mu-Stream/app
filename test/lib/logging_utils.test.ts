import { describe, expect, it } from 'vitest';
import { Style } from '../../src/lib/logging_utils';

describe('Style', () => {
  it('should set color correctly', () => {
    const style = new Style().color('red');
    expect(style.build()).toBe('color: red;');
  });

  it('should set background correctly', () => {
    const style = new Style().background('blue');
    expect(style.build()).toBe('background: blue;');
  });

  it('should set bold correctly', () => {
    const style = new Style().bold();
    expect(style.build()).toBe('font-weight: bold;');
  });

  it('should set italic correctly', () => {
    const style = new Style().italic();
    expect(style.build()).toBe('font-style: italic;');
  });

  it('should set underline correctly', () => {
    const style = new Style().underline();
    expect(style.build()).toBe('text-decoration: underline;');
  });

  it('should set size correctly', () => {
    const style = new Style().size(12);
    expect(style.build()).toBe('font-size: 12px;');
  });

  it('should set upper correctly', () => {
    const style = new Style().upper();
    expect(style.build()).toBe('text-transform: uppercase;');
  });

  it('should set lower correctly', () => {
    const style = new Style().lower();
    expect(style.build()).toBe('text-transform: lowercase;');
  });
});
