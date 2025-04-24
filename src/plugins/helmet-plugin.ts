import helmet from "@fastify/helmet";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import envConfig from "../config/env-config.js";

const helmetPlugin: FastifyPluginAsync = fp(async (fastify) => {
	await fastify.register(
		helmet,
		envConfig.NODE_ENV === "development"
			? {
					contentSecurityPolicy: {
						directives: {
							defaultSrc: ["'self'"],
							scriptSrc: ["'self'", "'unsafe-inline'"],
							styleSrc: ["'self'", "'unsafe-inline'"],
						},
					},
				}
			: {},
	);
});

export default helmetPlugin;
