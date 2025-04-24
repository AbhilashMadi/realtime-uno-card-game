import { BaseException } from "@exceptions";
import { HttpExceptionNames, HttpStatusCodes } from "@utils";

export default class NotFoundException extends BaseException {
	constructor(message = "Resource not found") {
		super(message, HttpStatusCodes.NOT_FOUND, HttpExceptionNames.NOT_FOUND);
	}
}
