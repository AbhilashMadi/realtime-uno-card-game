import { corsConfig } from "@configs";
import cors from "@fastify/cors";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const corsPlugin: FastifyPluginAsync = fp(async (fastify) => {
	await fastify.register(cors, corsConfig.fastify);
});

export default corsPlugin;
