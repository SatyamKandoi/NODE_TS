import { InvalidPathError } from "../errors/invalid-path-error";
import { Application, NextFunction, Response, Request } from "express";

const handleErrorResponse = (
	res: Response,
	error: Error,
	statusCode: number,
	errorType: string
) => {
	const { message } = error;
	res.status(statusCode).json({
		error: {
			message,
			errorType,
		},
	});
};
const invalidPathErrorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof InvalidPathError) {
		return handleErrorResponse(res, error, 404, error.errorType);
	}
};

export default (app: Application) => {
	app.use([invalidPathErrorHandler]);
};
