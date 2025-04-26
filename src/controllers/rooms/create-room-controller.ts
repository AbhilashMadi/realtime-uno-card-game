import type { CreateRoomInput } from "@/dtos/rooms-schema.js";
import { ConflictException } from "@exceptions";
import { Room, RoomPemission } from "@models";
import { Generators, PlayerRoles, RoomPermissions, RoomStatus } from "@utils";
import type { FastifyReply, FastifyRequest } from "fastify";

export default async function createRoomController(
	request: FastifyRequest<{ Body: CreateRoomInput }>,
	response: FastifyReply,
) {
	// 1. Validate the request body
	const { is_private, max_players, name, room_password, chat_enabled } =
		request.body;

	// 2. Get Authenticated User
	const { user_id, username } = request.user;
	const { log } = request;

	// 3. Dont allow to create multiple rooms with the existing rooms name
	const roomWithSameName = await Room.findOne({ created_by: user_id, name });
	if (roomWithSameName) {
		log.warn(
			`User(${user_id}) attempted to create room with existing room name.`,
		);
		throw new ConflictException(
			`You already have an room created before with the name: ${name}, use other name for this room!`,
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

	// 6. Create Room
	const newRoom = new Room({
		created_by: user_id,
		room_id,
		name,
		max_players,
		is_private,
		chat_enabled,
		// room_password only if private
		room_password: is_private ? room_password : undefined,
		players: [
			{
				user: user_id,
				username: username,
			},
		],
	});

	// 7. Create RoomPermission for creator
	await RoomPemission.create({
		room_id: newRoom._id,
		user_id: user_id,
		role: PlayerRoles.HOST,
		chat_enabled,
		permissions: [
			RoomPermissions.START_GAME,
			RoomPermissions.KICK_PLAYER,
			RoomPermissions.CANCEL_GAME,
			RoomPermissions.SEND_CHAT,
			RoomPermissions.PLAY_MOVE,
		],
	});

	await newRoom.save();
	log.info(`Room created by User(${user_id}): Room(${room_id})`);

	// 5. Send response to the creator
	return response.success("Room created successfully.", {
		room_id: newRoom.room_id,
		name: newRoom.name,
		max_players: newRoom.max_players,
		is_private: newRoom.is_private,
		created_by: newRoom.created_by,
	});
}
