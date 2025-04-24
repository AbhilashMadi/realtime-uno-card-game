import { BaseException } from "@exceptions";
import { HttpExceptionNames, HttpStatusCodes } from "@utils";

export default class UnauthorizedException extends BaseException {
	constructor(message = "Unauthorized") {
		super(
			message,
			HttpStatusCodes.UNAUTHORIZED,
			HttpExceptionNames.UNAUTHORIZED,
		);
	}
}
