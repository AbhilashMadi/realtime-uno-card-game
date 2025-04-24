import type { UserRoles } from "@utils";

export interface JWTPayload {
	user_id: string; // Unique identifier for the user
	user_agent: string; // User-Agent string from the client
	role: UserRoles; // Role (can be changed to an array if needed)
}
