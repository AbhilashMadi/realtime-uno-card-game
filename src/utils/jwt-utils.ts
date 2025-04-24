import { jwtConfig } from "@configs";
import {
	type JWTPayload,
	type JWTPayload as JosePayload,
	SignJWT,
	jwtVerify,
} from "jose";

// Helper function to encode the secret
const getSecretKey = () => new TextEncoder().encode(jwtConfig.secret);

// Sign JWT with strong typing
export async function signJWT<T>(
	payload: T,
	expiresIn: string = jwtConfig.signOptions.expiresIn,
): Promise<string> {
	try {
		const { issuer, audience } = jwtConfig.signOptions;

		const jwt = await new SignJWT(payload as JWTPayload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(expiresIn)
			.setIssuer(issuer)
			.setAudience(audience)
			.sign(getSecretKey());

		return jwt;
	} catch {
		throw new Error("Error signing JWT");
	}
}

// Verify JWT with type-safe return
export async function verifyJWT<T>(token: string): Promise<T> {
	try {
		const { payload } = await jwtVerify<JosePayload>(
			token,
			getSecretKey(),
			jwtConfig.verifyOptions,
		);
		return payload as unknown as T;
	} catch {
		throw new Error("Invalid or expired token");
	}
}
