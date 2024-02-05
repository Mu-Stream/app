import { type SignalData } from 'simple-peer'

export enum P2PPayloadType {
  RENEGOCIATE = 'RENEGOCIATE'
}

export interface BaseP2PPayload {
  type: P2PPayloadType
}

export interface P2PReNegociatePayload extends BaseP2PPayload {
  type: P2PPayloadType.RENEGOCIATE
  signal: SignalData
}

export type P2PPayload = P2PReNegociatePayload
