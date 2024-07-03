import { getToastStore } from '@skeletonlabs/skeleton';

export class Toaster {
  private _toastStore?: ReturnType<typeof getToastStore>;

  public trigger(payload: { message: string; severity?: 'normal' | 'success' | 'error' }) {
    this._toastStore?.trigger({
      message: payload.message,
      // background: payload.severity ?? 'normal',
    });
  }

  public init(store: ReturnType<typeof getToastStore>) {
    this._toastStore = store;
    return () => {};
  }
}
