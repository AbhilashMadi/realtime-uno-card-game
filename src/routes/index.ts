import { authMiddleware } from "@middlewares";
import type { FastifyInstance } from "fastify";
import authRoutes from "./auth-routes.js";
import roomsRoutes from "./room-routes.js";

export default function registerRoutes(app: FastifyInstance) {
	// Public routes
	app.register(authRoutes, { prefix: "/api/v1/auth" });

	// Protected routes (rooms)
	app.register(
		(app: FastifyInstance) => {
			// --- Protect all the rooms endpoints ---
			app.addHook("preHandler", authMiddleware);
			app.register(roomsRoutes);
		},
		{ prefix: "/api/v1/rooms" },
	);
}
