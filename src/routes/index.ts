import type { FastifyInstance } from "fastify";
import authRoutes from "./auth-routes.js";
import protectedRoutes from "./protected-routes.js";

export default function registerRoutes(app: FastifyInstance) {
	app.register(authRoutes, { prefix: "/api/v1/auth" });
	app.register(protectedRoutes, { prefix: "/api/v1/protected" });
}
