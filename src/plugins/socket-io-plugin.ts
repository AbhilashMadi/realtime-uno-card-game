import { corsConfig } from "@configs";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Server as SocketIOServer } from "socket.io";

const socketIoPlugin: FastifyPluginAsync = fp(
	async (fastify: FastifyInstance) => {
		try {
			// Initialize Socket.IO server
			const io = new SocketIOServer(fastify.server, {
				cors: corsConfig.socket,
			});

			// Decorate fastify instance
			fastify.decorate("io", io);

			// Decorate request object
			fastify.decorateRequest("io", null);

			// Attach io to each incoming request
			fastify.addHook("onRequest", async (request) => {
				request.io = io;
			});

			// Setup connection listener
			io.on("connection", (socket) => {
				fastify.log.info(`New connection: ${socket.id}`);

				socket.on("disconnect", () => {
					fastify.log.info(`User disconnected: ${socket.id}`);
				});

				socket.on("error", (err) => {
					fastify.log.error(`Socket error: ${err.message}`);
				});
			});

			fastify.log.info(
				"⚡ Socket.IO server initialized and attached to Fastify.",
			);
		} catch (error) {
			fastify.log.error(
				`Error during Socket.IO setup: ${(error as { message: string }).message}`,
			);
			throw error;
		}
	},
);

export default socketIoPlugin;
