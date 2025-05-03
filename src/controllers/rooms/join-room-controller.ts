import {
	BadRequestException,
	NotFoundException,
	UnauthorizedException,
} from "@exceptions";
import { Room, RoomPermission } from "@models";
import type { JoinRoomInput } from "@root/src/dtos/rooms-schema.js";
import { PlayerRoles, RoomPermissions, RoomStatus } from "@utils";
import type { FastifyReply, FastifyRequest } from "fastify";

// --- Join Room Controller ---
export default async function joinRoomController(
	request: FastifyRequest<{ Body: JoinRoomInput }>,
	reply: FastifyReply,
) {
	const { room_id, room_password } = request.body;
	const { user_id, username } = request.user;
	const { log, io } = request;

	// 1. Find Room
	const room = await Room.findOne({ room_id });
	if (!room) {
		log.warn(`Room not found: ${room_id}`);
		throw new NotFoundException("Room not found.");
	}

	// 2. Check Room Status
	if (room.status === RoomStatus.IN_PROGRESS) {
		log.warn(`Attempt to join a room already in progress: ${room_id}`);
		throw new BadRequestException("Cannot join. The room has already started.");
	}

	if (
		room.status === RoomStatus.ENDED ||
		room.status === RoomStatus.CANCELLED
	) {
		log.warn(
			`Attempt to join a room that has ended or been cancelled: ${room_id}`,
		);
		throw new BadRequestException(
			"Cannot join. The room has ended or was cancelled.",
		);
	}

	// 3. Check if Room is Full
	if (room.players.length >= room.max_players) {
		log.warn(`Attempt to join full room: ${room_id}`);
		throw new BadRequestException("Room is already full.");
	}

	// 4. If Room is Private, validate Password
	if (room.is_private) {
		const isPasswordCorrect = await room.comparePassword(room_password ?? "");
		if (!isPasswordCorrect) {
			throw new UnauthorizedException("Invalid room password.");
		}
	}

	// 5. Check if user is already in the room
	const alreadyInRoom = room.players.find((player) =>
		player.user.equals(user_id),
	);

	if (alreadyInRoom) {
		throw new BadRequestException("You are already in the room.");
	}

	// 6. Add player to Room
	room.players.push({
		//@ts-ignore
		user: user_id,
		username,
	});

	await room.save();

	// 7. Assign permissions based on user role
	const permissions = {
		[PlayerRoles.HOST]: Object.values(RoomPermissions),
		[PlayerRoles.PLAYER]: [
			RoomPermissions.PLAY_MOVE,
			...(room.chat_enabled ? [RoomPermissions.SEND_CHAT] : []),
		],
	};

	const userRole = room.created_by.equals(user_id)
		? PlayerRoles.HOST
		: PlayerRoles.PLAYER;

	// 8. Create RoomPermission for the player (or host)
	const permissionsdoc = await RoomPermission.create({
		room_id: room._id,
		user_id: user_id,
		role: userRole,
		permissions: permissions[userRole],
	});

	// 9. Add user to the Socket.IO room first (avoid duplicate joins)
	const socketId = request.headers["x-socket-id"] as string | undefined;
	if (socketId) {
		const socket = io.sockets.sockets.get(socketId);
		if (socket && !socket.rooms.has(room_id)) {
			socket.join(room_id);
		}
	}

	// 10. Notify others in the room after joining
	io.to(room_id).emit("room:join", {
		user_id,
		username,
	});

	log.info(`User(${user_id}) joined Room(${room_id})`);

	// 11. Send HTTP response to the user
	return reply.success("Joined room successfully.", {
		room_id: room.room_id,
		name: room.name,
		max_players: room.max_players,
		players: room.players,
		chat_messages: room.chat_messages,
		permissions: permissionsdoc.permissions,
	});
}
