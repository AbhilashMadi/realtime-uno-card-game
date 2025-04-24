import { envConfig } from "@configs";
import type { FastifyCookieOptions } from "@fastify/cookie";

const cookieConfig: FastifyCookieOptions = {
	secret: envConfig.COOKIE_SECRET, // Should be a strong, cryptographic secret
	parseOptions: {
		domain: envConfig.HOST, // Added domain option for better control
		httpOnly: true, // Always true for security, override env config
		secure:
			process.env.NODE_ENV === "production" ? true : envConfig.COOKIE_SECURE,
		sameSite: envConfig.COOKIE_SAME_SITE, // Default to strict if not set
		path: envConfig.COOKIE_PATH, // Default to root path
		signed: true,
		maxAge: Number(envConfig.COOKIE_MAX_AGE) || 60 * 60, // Default 1hr if not set
	},
	hook: "onRequest",
};

export default cookieConfig;
