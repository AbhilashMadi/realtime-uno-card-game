import { corsConfig } from "@configs";
import type { FastifyPluginAsync } from "fastify";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Server as SocketIOServer } from "socket.io";

const socketIoPlugin: FastifyPluginAsync = fp(
	async (fastify: FastifyInstance) => {
		try {
			// Initialize the Socket.IO server
			const io = new SocketIOServer(fastify.server, {
				cors: corsConfig.socket,
			});

			// Log when server is started
			fastify.log.info("⚡ Socket.IO server initialized.");

			// Handle new socket connections
			io.on("connection", (socket) => {
				fastify.log.info(`New connection: ${socket.id}`);

				// Handle disconnection
				socket.on("disconnect", () => {
					fastify.log.info(`User disconnected: ${socket.id}`);
				});

				// Handle any errors that might occur on the socket
				socket.on("error", (err) => {
					fastify.log.error(`Socket error: ${err.message}`);
				});
			});

			fastify.decorate("io", io);
			fastify.log.info("Socket.IO server setup complete.");
		} catch (error: unknown) {
			// Log the error if setup fails
			fastify.log.error(
				`Error during Socket.IO server setup: ${(error as { message: string }).message}`,
			);
			throw error;
		}
	},
);

export default fp(socketIoPlugin);
