import type { Emotes } from "./emotes";

export class EmotesWithId {
  emote: Emotes;
  id: string

  constructor(emote: Emotes)
  {
    this.emote = emote
    this.id = crypto.randomUUID();
  }
}