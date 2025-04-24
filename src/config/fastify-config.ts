import Fastify, { type FastifyInstance } from "fastify";

import { envConfig, loggerConfig } from "@configs";
import { globalErrorHandler, notFoundHandler } from "@handlers";
import {
	cookiePlugin,
	corsPlugin,
	dbPlugin,
	helmetPlugin,
	responsePlugin,
	socketIoPlugin,
} from "@plugins";

export default async function createFastifyServer(): Promise<FastifyInstance> {
	const app = Fastify({
		logger: loggerConfig[envConfig.NODE_ENV],
	});

	// Register core plugins
	await app.register(corsPlugin);
	await app.register(cookiePlugin);
	await app.register(helmetPlugin);

	// Register the MongoDB connection plugin
	await app.register(dbPlugin);

	// Custom decorators
	await app.register(responsePlugin);

	// Register socket io connection plugin
	await app.register(socketIoPlugin);

	// Global error handler
	app.setErrorHandler(globalErrorHandler);

	// Fallback for unknown routes
	app.setNotFoundHandler(notFoundHandler);

	return app;
}
