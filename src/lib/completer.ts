import { Some, Option, None } from 'bakutils-catcher';

export class Completer<T> {
  public complete!: (value: Option<T>) => void;
  public completeValue!: (value: T | undefined) => void;
  public isCompleted = false;
  public future: Promise<Option<T>>;

  constructor({ timeout }: { timeout: Option<number> } = { timeout: None }) {
    this.future = new Promise<Option<T>>((resolve, _) => {
      const tm = timeout.map(ms =>
        setTimeout(() => {
          resolve(None);
        }, ms)
      );

      this.complete = (value: Option<T>) => {
        this.isCompleted = true;
        resolve(value);
        tm.match({
          Some: t => clearTimeout(t),
          None: () => {},
        });
      };

      this.completeValue = value => {
        if (value) {
          resolve(Some(value as unknown as any));
        } else {
          resolve(None);
        }
        tm.match({
          Some: t => clearTimeout(t),
          None: () => {},
        });
      };
    });
  }
}
