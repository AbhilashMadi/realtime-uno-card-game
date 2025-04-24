import type { FastifyReply, FastifyRequest } from "fastify";

import { CookieNames } from "@utils";

export default async function logoutController(
	_request: FastifyRequest,
	reply: FastifyReply,
) {
	reply.clearCookie(CookieNames.AUTH_TOKEN);
	return reply.success("Logout successful", {});
}
