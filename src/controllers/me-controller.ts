import { NotFoundException, UnauthorizedException } from "@exceptions";
import { User } from "@models";
import { ErrorMessages } from "@utils";
import type { FastifyReply, FastifyRequest } from "fastify";

export default async function meController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const user = request.user;
	if (!user) throw new UnauthorizedException("User not authenticated");

	const foundUser = await User.findById(user.user_id);
	if (!foundUser) throw new NotFoundException(ErrorMessages.notFound("User"));

	return reply.success("Fetched user", foundUser.toJSON());
}
