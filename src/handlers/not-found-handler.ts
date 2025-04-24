import { HttpExceptionNames, HttpStatusCodes } from "@utils";
import type { FastifyReply, FastifyRequest } from "fastify";

const notFoundHandler = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	return reply.status(HttpStatusCodes.NOT_FOUND).send({
		success: false,
		error: {
			name: HttpExceptionNames.NOT_FOUND,
			message: `Route ${request.method}:${request.url} not found`,
			path: request.raw.url,
			method: request.method,
			timestamp: new Date().toISOString(),
		},
	});
};

export default notFoundHandler;
