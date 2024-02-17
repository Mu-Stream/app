import { type SignalData } from 'simple-peer'
import type { Emotes } from './emotes'

export enum P2PPayloadType {
  RENEGOCIATE = 'RENEGOCIATE',
  INIT_ROOM = 'INIT_ROOM',
  EMOTE = 'EMOTE'
}

export interface BaseP2PPayload {
  type: P2PPayloadType
}

export interface P2PReNegociatePayload extends BaseP2PPayload {
  type: P2PPayloadType.RENEGOCIATE
  signal: SignalData
}

export interface P2PInitRoomPayload extends BaseP2PPayload {
  type: P2PPayloadType.INIT_ROOM
  roomId: string
}

export interface P2PEmotePayload extends BaseP2PPayload {
  type: P2PPayloadType.EMOTE
  emote: Emotes
}

export type P2PPayload = P2PReNegociatePayload | P2PInitRoomPayload | P2PEmotePayload
