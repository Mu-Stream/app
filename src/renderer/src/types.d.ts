export type SocketId = string
export type Signal = any
export type Peer = { ws: ServerWebSocket<SocketIdentity>; signal: Signal }

export interface SocketIdentity {
  uuid: SocketId
}

export enum ClientPayloadType {
  CREATE_ROOM = 'CREATE_ROOM',
  UPDATE_PEER = 'UPDATE_PEER',
  JOIN_ROOM = 'JOIN_ROOM'
}

export enum ServerPayloadType {
  INIT_ROOM = 'INIT_ROOM',
  CONNECT_TO_ROOM = 'CONNECT_TO_ROOM'
}

export interface BaseServerPayload {
  type: ServerPayloadType
}

export interface ServerInitRoomPayload extends BaseServerPayload {
  type: ServerPayloadType.INIT_ROOM
  roomId: RoomId
}

export interface ServerConnectToRoomPayload extends BaseServerPayload {
  type: ServerPayloadType.CONNECT_TO_ROOM
  signals: Signal[]
}

export interface BaseClientPayload {
  type: ClientPayloadType
}

export interface ClientCreateRoomPayload extends BaseClientPayload {
  type: ClientPayloadType.CREATE_ROOM
}

export interface ClientUpdatePeerPayload extends BaseClientPayload {
  type: ClientPayloadType.UPDATE_PEER
  signal: Signal
}

export interface ClientJoinRoomPayload extends BaseClientPayload {
  type: ClientPayloadType.JOIN_ROOM
  roomId: RoomId
}

export type ClientPayload =
  | ClientCreateRoomPayload
  | ClientUpdatePeerPayload
  | ClientJoinRoomPayload

export type ServerPayload = ServerInitRoomPayload | ServerConnectToRoomPayload
