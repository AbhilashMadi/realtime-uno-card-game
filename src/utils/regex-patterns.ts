const RegexPatterns: Readonly<Record<string, RegExp>> = {
	// Strong password regex: at least 1 uppercase, 1 lowercase, 1 digit, 1 special char, min 8 chars
	PASSWORD:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&()[\]{}])[A-Za-z\d@$!%*#?&()[\]{}]{8,}$/,
	// Instagram-style username: starts with letter, allows letters, numbers, dots, underscores, 5–15 chars
	USERNAME: /^[a-z][\w.]{4,14}$/i,
	// Room Id regex pattern
	ROOM_ID: /^[A-Za-z0-9]{6,}$/,
};

export default RegexPatterns;
