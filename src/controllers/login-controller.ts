import type { LoginInput } from "@/dtos/auth-schema.js";
import { envConfig } from "@configs";
import { NotFoundException, UnauthorizedException } from "@exceptions";
import { User } from "@models";
import { CookieNames, ErrorMessages, JWT } from "@utils";
import type { FastifyReply, FastifyRequest } from "fastify";

export default async function loginController(
	request: FastifyRequest<{ Body: LoginInput }>,
	reply: FastifyReply,
) {
	const { password, remember, username } = request.body;

	// 1. Find user by username or email
	const user = await User.findOne({ username });
	if (!user) {
		throw new NotFoundException(
			ErrorMessages.notFound(`Username: ${username}`),
		);
	}

	// 2. Validate password
	const isPasswordValid = await user.comparePassword(password);
	if (!isPasswordValid) {
		throw new UnauthorizedException(ErrorMessages.invalidCredentials);
	}

	// 3. Extract user-agent
	const userAgent = request.headers["user-agent"] ?? "unknown";

	// 4. Sign JWT token
	const token = await JWT.signJWT({
		user_id: (user._id as string).toString(),
		user_agent: userAgent,
		role: user.role,
	});

	// 5. Set secure cookie
	reply.setCookie(CookieNames.AUTH_TOKEN, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		signed: true,
		maxAge: remember ? envConfig.COOKIE_MAX_AGE : undefined, // persistent or session
	});

	// 6. Return success response
	return reply.success("Login successful", user.toJSON());
}
