import {beforeEach, describe, expect, it, vi} from 'vitest';
import type {CoreAppContext} from '../../../src/lib/app';
import {Ok, type Result} from 'bakutils-catcher';
import {type Binder, Plugin} from "../../../src/lib/plugins/i_plugin";

class TestPlugin extends Plugin<'test'> {
  name = 'test';
  version = 1;
  plugin_context = {};

  async hookEvents(binder: Binder<string, { key: string }>): Promise<Result<null, Error>> {
    return Ok(null);
  }

  async init(): Promise<Result<null, Error>> {
    return Ok(null);
  }

  async dispose(): Promise<Result<null, Error>> {
    return Ok(null);
  }
}

describe('Plugin', () => {
  let context: CoreAppContext;
  let plugin: TestPlugin;

  beforeEach(() => {
    context = {} as CoreAppContext;
    plugin = new TestPlugin(context);
  });

  it('should set the context property in the constructor', () => {
    expect(plugin.context).toBe(context);
  });

  it('should hook events correctly', async () => {
    const binder: Binder<string, { key: string }> = vi.fn();
    const result = await plugin.hookEvents(binder);
    expect(resultsAreEqual(result, Ok(null))).toBe(true);
  });

  function resultsAreEqual<T, E>(actual: Result<T, E>, expected: Result<T, E>): boolean {
    return actual.isOk() === expected.isOk() &&
        actual.isErr() === expected.isErr() &&
        JSON.stringify(actual?.value) === JSON.stringify(expected?.value);
  }

  it('should initialize correctly', async () => {
    const result = await plugin.init();
    expect(resultsAreEqual(result, Ok(null))).toBe(true);
  });

  it('should dispose correctly', async () => {
    const result = await plugin.dispose();
    expect(resultsAreEqual(result, Ok(null))).toBe(true);
  });

});