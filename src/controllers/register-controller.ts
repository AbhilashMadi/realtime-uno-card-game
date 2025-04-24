import type { RegisterInput } from "@/dtos/auth-schema.js";
import type { FastifyReply, FastifyRequest } from "fastify";

import { ConflictException } from "@exceptions";
import { User } from "@models";
import {
	CookieNames,
	ErrorMessages,
	HttpStatusCodes,
	JWT,
	UserRoles,
} from "@utils";

export default async function registerController(
	request: FastifyRequest<{ Body: RegisterInput }>,
	reply: FastifyReply,
) {
	const { username, email, full_name, password } = request.body;

	// 1. Check for existing user
	const existingUser = await User.findOne({
		$or: [{ email }, { username }],
	});

	if (existingUser) {
		const conflictField = existingUser.email === email ? "email" : "username";
		throw new ConflictException(ErrorMessages.alreadyExists(conflictField));
	}

	// 2. Create new user (hashing handled by pre-save hook)
	const newUser = await User.create({
		username,
		email,
		full_name,
		password,
		role: UserRoles.USER,
	});

	// 3. Extract user-agent
	const userAgent = request.headers["user-agent"] ?? "unknown";

	// 4. Create JWT
	const token = await JWT.signJWT(
		{
			user_id: (newUser._id as string).toString(),
			user_agent: userAgent,
			role: newUser.role,
		},
		"1h",
	);

	// 5. Set session cookie (expires when browser closes)
	reply.setCookie(CookieNames.AUTH_TOKEN, token, {
		maxAge: undefined, // session cookie
	});

	// 6. Send sanitized user response
	return reply.success(
		"User registered successfully",
		newUser.toJSON(),
		HttpStatusCodes.CREATED,
	);
}
