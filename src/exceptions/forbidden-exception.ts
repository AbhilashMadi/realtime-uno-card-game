import { BaseException } from "@exceptions";
import { HttpExceptionNames, HttpStatusCodes } from "@utils";

export default class ForbiddenException extends BaseException {
	constructor(message = "Forbidden") {
		super(message, HttpStatusCodes.FORBIDDEN, HttpExceptionNames.FORBIDDEN);
	}
}
