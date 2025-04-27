import path from "node:path";
import { fileURLToPath } from "node:url";
import fastifyStatic from "@fastify/static";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.resolve(__filename);

const serveStaticPlugin = fp(async (fastify: FastifyInstance) => {
	// Register fastify-static plugin to serve static files
	fastify.register(fastifyStatic, {
		root: path.join(__dirname, "..", "..", "dist"),
		prefix: "/",
		decorateReply: true,
	});
});

export default serveStaticPlugin;
