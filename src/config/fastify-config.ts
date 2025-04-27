import Fastify, { type FastifyInstance } from "fastify";

import { envConfig, loggerConfig } from "@configs";
import { globalErrorHandler, notFoundHandler } from "@handlers";
import {
	cookiePlugin,
	corsPlugin,
	dbPlugin,
	docsPlugin,
	helmetPlugin,
	responsePlugin,
	// serveStaticPlugin,
	socketIoPlugin,
} from "@plugins";

export default async function createFastifyServer(): Promise<FastifyInstance> {
	const app = Fastify({
		logger: loggerConfig[envConfig.NODE_ENV],
	});

	// Register core plugins
	await app.register(corsPlugin); // CORS
	await app.register(cookiePlugin); // Cookies
	await app.register(helmetPlugin); // Security headers

	// Register the MongoDB connection plugin
	await app.register(dbPlugin);

	// Serve static files through GET - '/'
	// await app.register(serveStaticPlugin);

	// Register fastify scalar docs
	await app.register(docsPlugin);

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
