import helmet from "@fastify/helmet";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const helmetPlugin: FastifyPluginAsync = fp(async (fastify) => {
	await fastify.register(helmet);
});

export default helmetPlugin;
