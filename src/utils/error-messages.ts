const ErrorMessages = {
	// Required
	required: (field: string) => `${field} is required.`,

	// Length
	minLength: (field: string, length: number) =>
		`${field} must be at least ${length} characters long.`,
	maxLength: (field: string, length: number) =>
		`${field} must be at most ${length} characters long.`,

	// Format
	email: "Please provide a valid email address.",
	password:
		"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
	username:
		"Username can only contain letters, numbers, underscores, and periods.",

	// Custom
	passwordMatch: "Passwords do not match.",
	invalidCredentials: "Invalid username or password.",
	alreadyExists: (field: string) =>
		`An account with this ${field} already exists.`,
	notFound: (field: string) => `${field} not found.`,
	invalidField: (field: string) => `Invalid ${field}.`,
};

export default ErrorMessages;
