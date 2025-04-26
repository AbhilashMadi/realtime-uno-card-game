import { ErrorMessages } from "@utils";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// --- Room Create Schema ---
export const createRoomDTOSchema = z.object({
	name: z
		.string({ required_error: ErrorMessages.required("Room name") })
		.min(3, { message: ErrorMessages.minLength("Room name", 3) }),
	max_players: z
		.number({ required_error: ErrorMessages.required("Max players") })
		.min(2, { message: "Minimum 2 players required" })
		.max(10, { message: "Maximum 10 players allowed" }),
	chat_enabled: z.boolean().optional().default(true),
	room_password: z.string().optional(),
	is_private: z.boolean().default(false),
});

// --- Room Join Schema ---
export const joinRoomDTOSchema = z.object({
	roomId: z
		.string({ required_error: ErrorMessages.required("Room ID") })
		.min(6, { message: "Invalid Room ID" }),
});

// --- Room Start Schema ---
export const startRoomDTOSchema = z.object({
	roomId: z
		.string({ required_error: ErrorMessages.required("Room ID") })
		.min(6, { message: "Invalid Room ID" }),
});

// --- Room Leave Schema ---
export const leaveRoomDTOSchema = z.object({
	roomId: z
		.string({ required_error: ErrorMessages.required("Room ID") })
		.min(6, { message: "Invalid Room ID" }),
});

// --- Get Room Details ---
const roomIdParamSchema = z.object({
	roomId: z.string({ required_error: ErrorMessages.required("Room ID") }),
});

// --- Type Inference ---
export type CreateRoomInput = z.infer<typeof createRoomDTOSchema>;
export type JoinRoomInput = z.infer<typeof joinRoomDTOSchema>;
export type StartRoomInput = z.infer<typeof startRoomDTOSchema>;
export type LeaveRoomInput = z.infer<typeof leaveRoomDTOSchema>;

// --- JSON Schema for Swagger/Docs ---
export const RoomRouteSchemas = {
	createRoomSchema: {
		summary: "Create a game room",
		tags: ["rooms"],
		body: zodToJsonSchema(createRoomDTOSchema),
	},
	joinRoomSchema: {
		summary: "Join a game room",
		tags: ["rooms"],
		body: zodToJsonSchema(joinRoomDTOSchema),
	},
	startRoomSchema: {
		summary: "Start the game in room",
		tags: ["rooms"],
		body: zodToJsonSchema(startRoomDTOSchema),
	},
	leaveRoomSchema: {
		summary: "Leave a room",
		tags: ["rooms"],
		body: zodToJsonSchema(leaveRoomDTOSchema),
	},
	getRoomDetailsSchema: {
		summary: "Get room details by roomId",
		tags: ["rooms"],
		params: zodToJsonSchema(roomIdParamSchema),
	},
};
