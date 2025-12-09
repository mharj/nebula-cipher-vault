export class HttpError extends Error {
	public readonly statusCode: number;
	public readonly isSilent: boolean;
	constructor(statusCode: number, message: string, isSilent?: boolean) {
		super(message);
		this.name = 'HttpError';
		this.statusCode = statusCode;
		this.isSilent = isSilent || false;
	}
}
