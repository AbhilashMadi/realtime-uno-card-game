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
	const { loginSchema, registerSchema, logoutSchema, meSchema } =
		AuthRouteSchemas;

	app.post("/register", { schema: registerSchema }, registerController);
	app.post("/login", { schema: loginSchema }, loginController);
	app.post(
		"/logout",
		{ onRequest: authMiddleware, schema: logoutSchema },
		logoutController,
	);
	app.get("/me", { onRequest: authMiddleware, schema: meSchema }, meController);
}
