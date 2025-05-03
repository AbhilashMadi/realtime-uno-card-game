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

// --- Get Room Details  ---
const getRoomDetailsParamsSchema = z.object({
	room_id: z.string(),
});

// --- Room Join Schema  ---
const joinRoomDTOSchema = z.object({
	room_id: z.string({ required_error: ErrorMessages.required("Room ID") }),
	room_password: z.string({}).optional(),
});

// --- Room Start Schema ---
// --- Room Leave Schema ---

// --- Type Inference ---
export type CreateRoomInput = z.infer<typeof createRoomDTOSchema>;
export type JoinRoomInput = z.infer<typeof joinRoomDTOSchema>;
export type GetRoomDetailsParamsInput = z.infer<
	typeof getRoomDetailsParamsSchema
>;
// export type StartRoomInput = z.infer<typeof roomIdParamSchema>;
// export type LeaveRoomInput = z.infer<typeof roomIdParamSchema>;
// export type CancelRoomInput = z.infer<typeof roomIdParamSchema>;

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
	getRoomDetailsSchema: {
		summary: "Get room details by roomId",
		tags: ["rooms"],
		params: zodToJsonSchema(getRoomDetailsParamsSchema),
	},
	// startRoomSchema: {
	// 	summary: "Start the game in room",
	// 	tags: ["rooms"],
	// 	body: zodToJsonSchema(roomIdParamSchema),
	// },
	// leaveRoomSchema: {
	// 	summary: "Leave a room",
	// 	tags: ["rooms"],
	// 	body: zodToJsonSchema(roomIdParamSchema),
	// },
};
