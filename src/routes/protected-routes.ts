import { authMiddleware } from "@middlewares";
import type { FastifyInstance } from "fastify";

export default function protectedRoutes(app: FastifyInstance) {
	app.get("/", { preHandler: authMiddleware }, async (_, reply) => {
		reply.send({ message: "Protected route hit (stub)" });
	});
}
