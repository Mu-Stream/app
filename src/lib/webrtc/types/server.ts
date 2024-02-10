import type { RoomId, Signal } from "./general"

export enum ServerPayloadType {
  HOST_OK = 'HOST_OK',
  JOIN_OK = 'JOIN_OK',
  SIGNAL_REQUESTER = 'SIGNAL_REQUESTER'
}

export interface BaseServerPayload {
  type: ServerPayloadType
}

export interface ServerInitRoomPayload extends BaseServerPayload {
  type: ServerPayloadType.HOST_OK
  roomId: RoomId
}

export interface ServerConnectToRoomPayload extends BaseServerPayload {
  type: ServerPayloadType.JOIN_OK
  signal: Signal
  uuid: string
}

export interface ServerSignalRequesterPayload extends BaseServerPayload {
  type: ServerPayloadType.SIGNAL_REQUESTER
  uuid: string
  signal: Signal
}

export type ServerPayload =
  | ServerInitRoomPayload
  | ServerConnectToRoomPayload
  | ServerSignalRequesterPayload
