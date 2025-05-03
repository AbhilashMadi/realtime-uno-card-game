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
			fastify.decorate("io", { getter: () => io });

			// Decorate request object
			fastify.decorateRequest("io", { getter: () => io });

			// // Attach io to each incoming request (optional, now already available via request.io)
			// fastify.addHook("onRequest", async (request) => {
			// 	// request.io already accessible
			// });

			// Setup connection listener
			io.on("connection", (socket) => {
				fastify.log.info(`[SOCKET] New connection: ${socket.id}`);

				socket.on("disconnect", () => {
					fastify.log.info(`[SOCKET] User disconnected: ${socket.id}`);
				});

				socket.on("error", (err) => {
					fastify.log.error(`[SOCKET] Socket error: ${err.message}`);
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
