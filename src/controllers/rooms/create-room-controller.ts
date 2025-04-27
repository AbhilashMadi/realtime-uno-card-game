import type { CreateRoomInput } from "@/dtos/rooms-schema.js";
import { ConflictException } from "@exceptions";
import { Room } from "@models";
import { Generators, RoomStatus } from "@utils";
import type { FastifyReply, FastifyRequest } from "fastify";

export default async function createRoomController(
	request: FastifyRequest<{ Body: CreateRoomInput }>,
	response: FastifyReply,
) {
	// 1. Validate request body
	const { is_private, max_players, name, room_password, chat_enabled } =
		request.body;

	// 2. Get authenticated user
	const { user_id, username } = request.user;
	const { log } = request;

	// 3. Check if room name already exists for the user
	const roomWithSameName = await Room.findOne({ created_by: user_id, name });
	if (roomWithSameName) {
		log.warn(
			`User(${user_id}) attempted to create room with existing room nam+e.`,
		);
		throw new ConflictException(
			`You already have a room with the name: ${name}. Please use another name.`,
		);
	}

	// 4. Check if user already has active rooms
	const existingRooms = await Room.findOne({
		created_by: user_id,
		status: { $in: [RoomStatus.WAITING, RoomStatus.IN_PROGRESS] },
	});

	if (existingRooms) {
		log.warn(`User(${user_id}) attempted to create multiple active rooms.`);
		throw new ConflictException(
			`You already have an active room with id: ${existingRooms.room_id}.`,
		);
	}

	// 5. Generate unique room ID
	const room_id = Generators.generateRoomId();

	// 6. Create the Room (no immediate player addition or host permissions)
	const newRoom = new Room({
		created_by: user_id,
		host: username,
		room_id,
		name,
		max_players,
		is_private,
		chat_enabled,
		room_password: is_private ? room_password : undefined,
	});

	// 7. Save the room
	await newRoom.save();
	log.info(`Room created by User(${user_id}): Room(${room_id})`);

	// 8. Send HTTP response to the creator
	return response.success("Room created successfully.", newRoom.toJSON());
}
