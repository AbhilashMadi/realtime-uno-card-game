import { envConfig } from "@configs";
import type { FastifyCorsOptions } from "@fastify/cors";

// Helper to check if the origin is allowed
const checkCorsOrigin = (
	origin: string | undefined,
	callback: (err: Error | null, allow: boolean) => void,
) => {
	const allowedOrigin = envConfig.CORS_ALLOWED_ORIGIN;

	// Allow requests with no origin (like Postman, curl, mobile apps, etc.)
	if (!origin) return callback(null, true);
	if (origin === allowedOrigin) return callback(null, true);

	return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
};

// Fastify-compatible CORS config
const fastifyCorsConfig: FastifyCorsOptions = {
	origin: checkCorsOrigin,
	credentials: envConfig.CORS_CREDENTIALS,
	methods: envConfig.CORS_ALLOWED_METHODS.split(","),
	allowedHeaders: envConfig.CORS_ALLOWED_HEADERS.split(","),
	exposedHeaders: envConfig.CORS_EXPOSED_HEADERS.split(","),
	preflightContinue: false,
	optionsSuccessStatus: 204,
	maxAge: envConfig.CORS_MAX_AGE,
};

// Socket.IO-compatible CORS config
const socketCorsConfig = {
	origin: checkCorsOrigin,
	credentials: envConfig.CORS_CREDENTIALS,
	methods: envConfig.CORS_ALLOWED_METHODS.split(","),
	allowedHeaders: envConfig.CORS_ALLOWED_HEADERS.split(","),
};

export default {
	fastify: fastifyCorsConfig,
	socket: socketCorsConfig,
};
