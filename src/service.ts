import {ExpressService} from './services/express';
import {envConfig} from './env';
import {logger} from './logger';
import './lib/nodejs';
import {startDatabaseConnection, stopDatabaseConnection} from './db';

let expressSrv: ExpressService | undefined;

export async function startAll() {
	expressSrv = new ExpressService(envConfig.get('PORT'), logger);
	await expressSrv.start();
	return Promise.all([startDatabaseConnection()]);
}

export async function stopAll() {
	await expressSrv?.stop();
	return Promise.all([stopDatabaseConnection()]);
}

if (process.env.NODE_ENV !== 'test') {
	startAll();
}

process.once('SIGINT', async function () {
	logger.debug('SIGINT: Closing services');
	await expressSrv?.stop();
	process.exit();
});
