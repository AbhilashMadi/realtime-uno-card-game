import { BaseException } from "@exceptions";
import { HttpExceptionNames, HttpStatusCodes } from "@utils";

export default class InternalServerErrorException extends BaseException {
	constructor(message = "Internal Server Error") {
		super(
			message,
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
			HttpExceptionNames.INTERNAL_SERVER_ERROR,
		);
	}
}
