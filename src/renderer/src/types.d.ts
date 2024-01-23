type SignalingPayload = any

export enum MessageType {
  INIT = 'INIT',
  CREATE_ROOM = 'CREATE_ROOM',
  REQUEST_JOIN_ROOM = 'JOIN_ROOM',
  CONNECT_TO_ROOM = 'CONNECT_TO_ROOM',
  ACCEPT_ROOM_JOIN = 'ACCEPT_ROOM_JOIN'
}

interface BaseSocetMessage {
  type: MessageType
}

export interface SocketInitMessage extends BaseSocketMessage {
  type: MessageType.INIT
  uuid: string
}

export interface SocketCreateRoomMessage extends BaseSocketMessage {
  type: MessageType.CREATE_ROOM
  peer: SignalingPayload
}

export interface SocketJoinRoomMessage extends BaseSocketMessage {
  type: MessageType.REQUEST_JOIN_ROOM
  room: string
}

export interface SocketConnectToRoomMessage extends BaseSocketMessage {
  type: MessageType.CONNECT_TO_ROOM
  peer: SignalingPayload
}

export interface SocketAcceptRoomJoinMessage extends BaseSocketMessage {
  type: MessageType.ACCEPT_ROOM_JOIN
  peer: SignalingPayload
  room: string
}

export type SocketMessage =
  | SocketInitMessage
  | SocketCreateRoomMessage
  | SocketJoinRoomMessage
  | SocketConnectToRoomMessage
  | SocketAcceptRoomJoinMessage
