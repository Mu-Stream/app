export class SignalingServerNotReady extends Error {
  constructor() {
    super("Signaling Server not ready");
  }
}

export class EventTimeout extends Error {
  constructor(event_name?: string) {
    super(`Event ${event_name ?? "unkown"} timed out`);
  }
}

export class UnableToRetrivePeerSignal extends Error {
  constructor() {
    super("Unable to retrive peer signal");
  }
}
