import {ErrorRequestHandler, NextFunction} from 'express';
import {HttpError} from '../lib/http/HttpError';
import {logger} from '../logger';
import {ApiError} from '../types/ApiError';

export const errorMiddleWare: ErrorRequestHandler = async (err: Error, req, res, next: NextFunction) => {
	logger.error(err);
	if (res.headersSent) {
		return next(err);
	}
	let code = 500;
	let message: ApiError = {name: err.name, message: err.message};
	if (err instanceof HttpError) {
		code = err.statusCode;
	}
	if (process.env.NODE_ENV !== 'production' && err.stack) {
		message.stack = err.stack;
	}
	res.status(code).json(message);
};
