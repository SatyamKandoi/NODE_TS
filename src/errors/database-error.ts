class DataBaseError extends Error {
	errorType: string;
	constructor(message: string, errorType: string) {
		super();
		this.message = message;
		this.errorType = errorType;
	}
}
export { DataBaseError };
