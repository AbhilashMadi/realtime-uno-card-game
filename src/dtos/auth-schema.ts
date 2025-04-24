import { ErrorMessages, RegexPatterns } from "@utils";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// --- Register Schema ---
export const registerDTOSchema = z
	.object({
		full_name: z
			.string({ required_error: ErrorMessages.required("Full name") })
			.min(2, { message: ErrorMessages.minLength("Full name", 2) }),

		username: z
			.string({ required_error: ErrorMessages.required("Username") })
			.min(5, { message: ErrorMessages.minLength("Username", 5) })
			.max(15, { message: ErrorMessages.maxLength("Username", 15) })
			.regex(RegexPatterns.USERNAME, { message: ErrorMessages.username }),

		email: z
			.string({ required_error: ErrorMessages.required("Email") })
			.email({ message: ErrorMessages.email }),

		password: z
			.string({ required_error: ErrorMessages.required("Password") })
			.regex(RegexPatterns.PASSWORD, {
				message: ErrorMessages.password,
			}),

		confirm_password: z
			.string({ required_error: ErrorMessages.required("Confirm password") })
			.min(8, { message: ErrorMessages.minLength("Confirm password", 8) }),
	})
	.refine((data) => data.password === data.confirm_password, {
		path: ["confirm_password"],
		message: ErrorMessages.passwordMatch,
	});

// --- Login Schema ---
export const loginDTOSchema = z.object({
	username: z
		.string()
		.regex(RegexPatterns.USERNAME, { message: ErrorMessages.username }),
	// .optional(),

	// email: z
	//   .string()
	//   .email({ message: ErrorMessages.email })
	//   .optional(),

	password: z
		.string({ required_error: ErrorMessages.required("Password") })
		.regex(RegexPatterns.PASSWORD, {
			message: ErrorMessages.password,
		}),

	remember: z.boolean().default(false),
});
// .refine((data) => data.username || data.email, {
//   message: "Either email or username is required.",
//   path: ["username"],
// });

// --- Type Inference ---
export type RegisterInput = z.infer<typeof registerDTOSchema>;
export type LoginInput = z.infer<typeof loginDTOSchema>;

// --- JSON Schema for Docs ---
export const AuthRouteSchemas = {
	registerSchema: {
		body: zodToJsonSchema(registerDTOSchema),
	},
	loginSchema: {
		body: zodToJsonSchema(loginDTOSchema),
	},
};
