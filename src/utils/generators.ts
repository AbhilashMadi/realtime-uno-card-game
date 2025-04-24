import { randomBytes, randomUUID } from "node:crypto";

export function generateUUID() {
	return randomUUID();
}

export function generateSecret(bytes = 32): string {
	return randomBytes(bytes).toString("hex"); // or 'base64'
}
