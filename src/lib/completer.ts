import { Some, Option, None } from 'bakutils-catcher';

export class Completer<T> {
	public complete!: (value: Option<T>) => void
	public completeValue!: (value: T) => void
	public isCompleted = false
	public future: Promise<Option<T>>

	constructor({ timeout }: { timeout: Option<number> } = { timeout: None }) {
		this.future = new Promise<Option<T>>((resolve, _) => {
			this.complete = (value: Option<T>) => {
				this.isCompleted = true
				resolve(value)
			}

			this.completeValue = (value: T) => {
				this.complete(Some(value as unknown as any));
			}

			if (timeout.isSome()) {
				return setTimeout(() => {
					this.complete(None);
				}, timeout.unwrap());
			}
		})
	}
}
