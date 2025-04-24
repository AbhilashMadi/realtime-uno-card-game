import { BaseException } from "@exceptions";
import { HttpExceptionNames, HttpStatusCodes } from "@utils";
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export default function globalErrorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const isCustom = error instanceof BaseException;

	const statusCode = isCustom
		? error.statusCode
		: HttpStatusCodes.INTERNAL_SERVER_ERROR;

	const response = {
		success: false,
		error: {
			name: error.name || HttpExceptionNames.INTERNAL_SERVER_ERROR,
			message: error.message || "Something went wrong",
			path: request.raw.url,
			method: request.method,
			timestamp: new Date().toISOString(),
		},
	};

	request.log.error(error);
	reply.status(statusCode).send(response);
}
