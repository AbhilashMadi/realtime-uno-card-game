import { BaseException } from "@exceptions";
import { HttpExceptionNames, HttpStatusCodes } from "@utils";

export default class BadRequestException extends BaseException {
	constructor(message = "Bad Request") {
		super(message, HttpStatusCodes.BAD_REQUEST, HttpExceptionNames.BAD_REQUEST);
	}
}
