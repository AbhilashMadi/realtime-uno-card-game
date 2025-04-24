import "fastify";
import type { Mongoose } from "mongoose";
import type { Server as SocketIOServer } from "socket.io";
import type { JWTPayload } from "./jwt.d.ts";

declare module "fastify" {
	interface FastifyInstance {
		mongoose: Mongoose;
		io: SocketIOServer;
	}

	interface FastifyRequest {
		user: JWTPayload;
	}

	interface FastifyReply {
		success: <T>(message: string, data: T, statusCode?: number) => FastifyReply;
		fail: (message: string, statusCode?: number) => FastifyReply;
	}
}
