import type {
	DoneFuncWithErrOrRes,
	FastifyReply,
	FastifyRequest,
} from "fastify";

import type { JWTPayload } from "@/types/jwt.js";
import { UnauthorizedException } from "@exceptions";
import { CookieNames, JWT } from "@utils";

export default async function authenticate(
	request: FastifyRequest,
	_reply: FastifyReply,
	done: DoneFuncWithErrOrRes,
) {
	try {
		// 1. Extract the signed auth cookie
		const signedToken = request.cookies[CookieNames.AUTH_TOKEN];
		if (!signedToken) {
			throw new UnauthorizedException("Auth token not provided");
		}

		// 2. Unsign the cookie to verify Fastify cookie signature
		const { value: token, valid } = request.unsignCookie(signedToken);
		if (!valid) {
			throw new UnauthorizedException("Cookie has been tampered with");
		}

		// 3. Verify JWT token using your utility (e.g., jose or jsonwebtoken)
		const tokenPayload: JWTPayload = await JWT.verifyJWT(token);

		// 4. Validate user-agent against the token
		const currentUserAgent = request.headers["user-agent"];
		if (!currentUserAgent) {
			throw new UnauthorizedException("User-Agent header missing");
		}

		if (tokenPayload.user_agent !== currentUserAgent) {
			throw new UnauthorizedException("User-Agent mismatch");
		}

		// 5. Attach decoded payload to request
		request.user = tokenPayload;
	} catch (err) {
		done(
			new UnauthorizedException(
				(err as { message: string }).message || "Authentication failed",
			),
		);
	}
}
