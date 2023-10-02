class InvalidPathError extends Error {
	errorType: string = "INVALID_PATH_ERROR";
	constructor(message: string = "INVALID_PATH_ERROR") {
		super();
		this.message = message;
		this.errorType = this.errorType;
	}
}

export { InvalidPathError };
