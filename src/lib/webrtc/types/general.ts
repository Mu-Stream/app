import type SimplePeer from "simple-peer"

export type RoomId = string
export type SocketId = string
export type Signal = SimplePeer.SignalData

export interface User {
	id: string;
	name: string;
}

export interface Song {
	title: string;
	artist: string;
	cover: string;
	total_time: number;
	current_time: number;
}
