import { BaseException } from "@exceptions";
import { HttpExceptionNames, HttpStatusCodes } from "@utils";

export default class ConflictException extends BaseException {
	constructor(message = "Conflict") {
		super(message, HttpStatusCodes.CONFLICT, HttpExceptionNames.CONFLICT);
	}
}
