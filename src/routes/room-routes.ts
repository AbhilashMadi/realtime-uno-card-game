import { RoomRouteSchemas } from "@/dtos/rooms-schema.js";
import { createRoomController, getRoomDetailsController } from "@controllers";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

// --- Join Room ---
export async function joinRoomController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	// TODO: Implement
	return reply.send({ message: "joinRoomController not implemented" });
}

// --- Start Room ---
export async function startRoomController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	// TODO: Implement
	return reply.send({ message: "startRoomController not implemented" });
}

// --- Leave Room ---
export async function leaveRoomController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	// TODO: Implement
	return reply.send({ message: "leaveRoomController not implemented" });
}

export default async function roomsRoutes(app: FastifyInstance) {
	// --- Create Room ---
	app.post("/create", {
		schema: RoomRouteSchemas.createRoomSchema,
		handler: createRoomController,
	});

	// --- Get Room Details ---
	app.get("/:room_id", {
		schema: RoomRouteSchemas.getRoomDetailsSchema,
		handler: getRoomDetailsController,
	});

	// --- Join Room ---
	app.post("/join", {
		schema: RoomRouteSchemas.joinRoomSchema,
		handler: joinRoomController,
	});

	// --- Start Room ---
	app.post("/start", {
		schema: RoomRouteSchemas.startRoomSchema,
		handler: startRoomController,
	});

	// --- Leave Room ---
	app.post("/leave", {
		schema: RoomRouteSchemas.leaveRoomSchema,
		handler: leaveRoomController,
	});
}
