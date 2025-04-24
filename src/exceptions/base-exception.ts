import { HttpStatusCodes } from "@utils";

export default class BaseException extends Error {
	public readonly statusCode: number;
	public readonly name: string;

	constructor(
		message: string,
		statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR,
		name = "Error",
	) {
		super(message);
		this.statusCode = statusCode;
		this.name = name;
		Error.captureStackTrace(this, this.constructor);
	}
}
