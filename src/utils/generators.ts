import { randomBytes, randomUUID } from "node:crypto";

export function generateUUID() {
	return randomUUID();
}

export function generateSecret(bytes = 32) {
	return randomBytes(bytes).toString("hex"); // or 'base64'
}

export function generateRoomId() {
	return Math.random().toString(36).substring(2, 10).toUpperCase();
}
