import {json, urlencoded, Application} from 'express';
import * as serverTiming from 'server-timing';
import {errorMiddleWare} from './middlewares/errorMiddleware';
import {logger} from './logger';
import {corsMiddleWare} from './middlewares/corsMiddleware';
import {HttpError} from './lib/http/HttpError';
import {getRouter} from './routes';

export async function setupExpress(app: Application): Promise<void> {
	logger.info('setup express');
	// express settings
	app.set('etag', false);
	app.disable('x-powered-by');
	app.enable('trust proxy');
	// body parsers
	app.use(urlencoded({extended: false}));
	app.use(json());

	// set cross origin headers
	app.use(corsMiddleWare);
	// broken server-timing module
	// @ts-ignore
	app.use(serverTiming());

	app.use('/api', getRouter());
	// error handling
	app.use('*', (req, res, next) => {
		next(new HttpError(404, `route_not_found: ${req.originalUrl}`, true));
	});
	app.use(errorMiddleWare);
	logger.info('setup express - done');
}
