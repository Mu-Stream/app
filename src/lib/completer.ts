export class Completer<T> {
  public complete!: (value: T) => void
  public completeError!: (error: any) => void
  public isCompleted = false
  public future: Promise<T>

  constructor() {
    this.future = new Promise<T>((resolve, reject) => {
      this.complete = (value: T) => {
        this.isCompleted = true
        resolve(value)
      }
      this.completeError = reject
    })
  }
}
