import { cookieConfig } from "@configs";
import cookie from "@fastify/cookie";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const cookiePlugin: FastifyPluginAsync = fp(async (fastify) => {
	await fastify.register(cookie, cookieConfig);
});

export default cookiePlugin;
