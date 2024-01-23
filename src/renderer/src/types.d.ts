export enum MessageType {
  INIT = 'INIT',
  LOGIN = 'LOGIN',
  CLOSE = 'CLOSE',
  CANDIDATE = 'CANDIDATE'
}

export interface SocketLoginMessage {
  type: MessageType.LOGIN
  asker: string
  askee: string
}

export interface SocketInitMessage {
  type: MessageType.INIT
  uuid: string
}

export interface SocketCandidateMessage {
  type: MessageType.CANDIDATE
  uuid: string
}

export interface SocketCloseMessage {
  type: MessageType.CLOSE
  uuid: string
  asker: string
  askee: string
}

export type SocketMessage = SocketLoginMessage | SocketInitMessage | SocketCloseMessage
