import type { GetRoomDetailsParamsInput } from "@/dtos/rooms-schema.js";
import {
	BadRequestException,
	ForbiddenException,
	NotFoundException,
} from "@exceptions";
import { RoomPermission } from "@models";
import { Room } from "@root/src/models/index.js";
import type { FastifyReply, FastifyRequest } from "fastify";

// --- Get Room Details ---
export default async function getRoomDetailsController(
	request: FastifyRequest<{ Params: GetRoomDetailsParamsInput }>,
	reply: FastifyReply,
) {
	// 1. Get user details
	const { user_id, username } = request.user;
	const { room_id } = request.params;
	const { log, io } = request;
	const socketId = request.headers["x-socket-id"];

	if (!socketId) {
		log.warn(`Missing socket ID for user(${user_id}) joining room(${room_id})`);
		throw new BadRequestException(
			"Socket ID is required in x-socket-id header",
		);
	}

	// 2. Find Room by room_id
	const room = await Room.findOne({ room_id: room_id });
	if (!room) {
		log.warn(`Room(${room_id}) not found.`);
		throw new NotFoundException(`Room with ID (${room_id}) not found.`);
	}

	// 3. Make sure the user is in the room
	const player = room.players.find((p) => p.user.toString() === user_id);
	if (!player) {
		log.warn(`Player(${user_id}) tried to join the room(${room_id})`);
		throw new ForbiddenException(
			`You are not part of this room with id: ${room_id}, Please join the room.`,
		);
	}

	// 4. Find User's permissions in this Room
	const permission = await RoomPermission.findOne({
		room_id: room._id,
		user_id,
	});

	if (!permission) {
		log.warn(`Permissions for the player: ${user_id} not found`);
		throw new ForbiddenException(
			`Permissions for the player: ${user_id} not found in permissions table`,
		);
	}

	// 5. Join the user into the room with given provided socketId
	const socket = io.sockets.sockets.get(socketId as string);

	if (!socket) {
		log.warn(`Socket with id(${socketId}) not found for user(${user_id})`);
		throw new BadRequestException("Invalid or expired socket ID");
	}

	await socket.join(room_id);
	log.info(`User(${user_id}) with socket(${socketId}) joined room(${room_id})`);

	// Emit 'room:joined' event to all users in the room
	io.to(room_id).emit("room:join", {
		user_id,
		room_id,
		username,
		message: `${username} Joined the room`,
	});

	// 6. Prepare response
	const res = {
		room: room.toJSON(),
		permission: permission.toJSON(),
	};

	return reply.success("Successfully joined the room.", res);
}
