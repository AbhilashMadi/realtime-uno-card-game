import type { GetRoomDetailsParamsInput } from "@/dtos/rooms-schema.js";
import { ForbiddenException, NotFoundException } from "@exceptions";
import { RoomPermission } from "@models";
import { Room } from "@root/src/models/index.js";
import type { FastifyReply, FastifyRequest } from "fastify";

// --- Get Room Details ---
export default async function getRoomDetailsController(
	request: FastifyRequest<{ Params: GetRoomDetailsParamsInput }>,
	reply: FastifyReply,
) {
	// 1. Get user details
	const { user_id } = request.user;
	const { room_id } = request.params;
	const { log } = request;

	// 2. Find Room by room_id
	const room = await Room.findOne({ room_id: room_id });
	if (!room) {
		log.warn(`Room(${room_id}) not found.`);
		throw new NotFoundException(`Room with ID (${room_id}) not found.`);
	}

	const players = room.players.find((p) => p.user.toString() === user_id);
	if (!players) {
		log.warn(`Player(${user_id}) tried to join the room(${room_id})`);
		throw new ForbiddenException(
			`You are not part of this room with id: ${room_id}, Please join the room.`,
		);
	}

	// 3. Find User's permissions in this Room
	const permission = await RoomPermission.findOne({
		room_id: room._id,
		user_id,
	});

	// if (!permission) {
	// 	log.warn(`Permission for user(${user_id}) in room(${room_id}) not found.`);
	// 	throw new NotFoundException("Permission for user in this room not found.");
	// }

	// 4. Prepare response
	const res = {
		room: room.toJSON(),
		permission: permission ? permission.toJSON() : {},
	};

	return reply.success("", res);
}
