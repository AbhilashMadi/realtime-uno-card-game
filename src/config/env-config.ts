import { z } from "zod";

// Zod schema for environment variables
const envSchema = z.object({
	// Server Vars
	NODE_ENV: z.enum(["development", "production", "test"]),
	SERVER_PORT: z.coerce.number().min(1), // Port for the server
	HOST: z.string().default("localhost"), // Server hostname or IP

	// Database
	MONGO_URI: z.string().url(),
	MONGO_DB_NAME: z.string(),

	// Cookie Vars
	COOKIE_SECRET: z.string().min(32), // Secret for signing cookies
	COOKIE_MAX_AGE: z.coerce.number().default(3600000), // Max Age of cookies
	COOKIE_SECURE: z.coerce.boolean().default(true), // If true, cookies will only be sent over HTTPS
	COOKIE_HTTP_ONLY: z.coerce.boolean().default(true), // If true, the cookie is not accessible via JavaScript
	COOKIE_SAME_SITE: z.enum(["strict", "lax", "none"]).default("lax"), // Cookie SameSite policy
	COOKIE_PATH: z.string().default("/"), // Path for cookies

	// Organization Vars
	ORG_NAME: z.string().default("-"), // Name of the organization
	ORG_CONTACT_EMAIL: z.string().email(), // Support email for the organization

	// JWT Vars
	JWT_SECRET: z.string().min(32), // Secret key for signing JWT tokens
	JWT_EXPIRES_IN: z.string(), // JWT expiration time (string, e.g., "1h")
	JWT_ISSUER: z.string().default("-"), // Issuer for JWT
	JWT_AUDIENCE: z.string(), // Audience for JWT

	// CORS Vars
	CORS_ALLOWED_ORIGIN: z.string().url(), // Allowed origins for CORS
	CORS_ALLOWED_METHODS: z.string().default("GET,POST,PUT,DELETE"), // Allowed methods for CORS
	CORS_ALLOWED_HEADERS: z.string().default("Content-Type,Authorization"), // Allowed headers for CORS
	CORS_EXPOSED_HEADERS: z.string().default("Content-Type,Authorization"), // Exposed headers for CORS
	CORS_CREDENTIALS: z.coerce.boolean().default(true), // Allow credentials (cookies, authorization headers, etc.)
	CORS_MAX_AGE: z.coerce.number().default(86400), // Preflight cache duration in seconds (1 day)
});

// Parse and validate environment variables
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("Invalid environment variables:");
	console.error(parsed.error.format());
	process.exit(1);
}

// Extract validated environment variables
const envConfig = parsed.data;

// Export the environment configuration
export type EnvConfig = z.infer<typeof envSchema>;
export default envConfig;
