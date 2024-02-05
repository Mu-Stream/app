import { type SignalData } from 'simple-peer'

export enum P2PPayloadType {
  RENEGOCIATE = 'RENEGOCIATE',
  INIT_ROOM = 'INIT_ROOM'
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

export type P2PPayload = P2PReNegociatePayload | P2PInitRoomPayload
