export type RoomId = string;
export type SocketId = string;
export type Signal = any;

export interface SocketIdentity {
	uuid: SocketId;
}

export enum ClientPayloadType {
	HOST = 'HOST',
	JOIN_HOST = 'JOIN_HOST',
	SIGNAL_REQUESTER = 'SIGNAL_REQUESTER'
}

export enum ServerPayloadType {
	HOST_OK = 'HOST_OK',
	JOIN_OK = 'JOIN_OK',
	SIGNAL_REQUESTER = 'SIGNAL_REQUESTER'
}

export enum P2PPayloadType {
	RENEGOCIATE = 'RENEGOCIATE'
}

export interface BaseP2PPayload {
	type: P2PPayloadType;
}

export interface BaseServerPayload {
	type: ServerPayloadType;
}

export interface P2PReNegociatePayload extends BaseP2PPayload {
	type: P2PPayloadType.RENEGOCIATE;
	signal: Signal;
}

export interface ServerInitRoomPayload extends BaseServerPayload {
	type: ServerPayloadType.HOST_OK;
	roomId: RoomId;
}

export interface ServerConnectToRoomPayload extends BaseServerPayload {
	type: ServerPayloadType.JOIN_OK;
	signal: Signal;
	uuid: string;
}

export interface ServerSignalRequesterPayload extends BaseServerPayload {
	type: ServerPayloadType.SIGNAL_REQUESTER;
	uuid: string;
	signal: Signal;
}

export interface BaseClientPayload {
	type: ClientPayloadType;
}

export interface ClientHostRoomPayload extends BaseClientPayload {
	type: ClientPayloadType.HOST;
}

export interface ClientJoinHostPayload extends BaseClientPayload {
	type: ClientPayloadType.JOIN_HOST;
	roomId: RoomId;
	signal: Signal;
}

export interface ClientSignalRequesterPayload extends BaseClientPayload {
	type: ClientPayloadType.SIGNAL_REQUESTER;
	uuid: string;
	signal: Signal;
}

export type ClientPayload =
	| ClientHostRoomPayload
	| ClientJoinHostPayload
	| ClientSignalRequesterPayload;

export type ServerPayload =
	| ServerInitRoomPayload
	| ServerConnectToRoomPayload
	| ServerSignalRequesterPayload;

export type P2PPayload = P2PReNegociatePayload;
