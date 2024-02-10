import type { RoomId, Signal } from "./general"

export enum ClientPayloadType {
  HOST = 'HOST',
  JOIN_HOST = 'JOIN_HOST',
  SIGNAL_REQUESTER = 'SIGNAL_REQUESTER'
}

export interface BaseClientPayload {
  type: ClientPayloadType
}

export interface ClientHostRoomPayload extends BaseClientPayload {
  type: ClientPayloadType.HOST
}

export interface ClientJoinHostPayload extends BaseClientPayload {
  type: ClientPayloadType.JOIN_HOST
  roomId: RoomId
  signal: Signal
}

export interface ClientSignalRequesterPayload extends BaseClientPayload {
  type: ClientPayloadType.SIGNAL_REQUESTER
  uuid: string
  signal: Signal
}

export type ClientPayload =
  | ClientHostRoomPayload
  | ClientJoinHostPayload
  | ClientSignalRequesterPayload

