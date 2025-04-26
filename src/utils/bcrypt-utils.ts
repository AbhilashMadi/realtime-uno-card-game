import bcrypt from "bcryptjs";

export async function hashString(plainText: string): Promise<string> {
	const salt = await bcrypt.genSalt();
	return bcrypt.hash(plainText, salt);
}

export async function compareString(
	plainText: string,
	hashedText: string,
): Promise<boolean> {
	return bcrypt.compare(plainText, hashedText);
}
