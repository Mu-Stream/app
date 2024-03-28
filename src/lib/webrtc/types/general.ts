import type SimplePeer from "simple-peer"

export type RoomId = string
export type SocketId = string
export type Signal = SimplePeer.SignalData
export interface User {
	id: string;
	name: string;
}
