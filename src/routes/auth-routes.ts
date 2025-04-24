import { AuthRouteSchemas } from "@/dtos/auth-schema.js";
import type { FastifyInstance } from "fastify";

import {
	loginController,
	logoutController,
	meController,
	registerController,
} from "@controllers";
import { authMiddleware } from "@middlewares";

// prefix: '/auth'
export default function authRoutes(app: FastifyInstance) {
	const { loginSchema, registerSchema } = AuthRouteSchemas;

	app.post("/register", { schema: registerSchema }, registerController);
	app.post("/login", { schema: loginSchema }, loginController);
	app.post("/logout", logoutController);
	app.get("/me", { onRequest: authMiddleware }, meController);
}
