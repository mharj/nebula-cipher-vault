import * as mongoose from 'mongoose';
import {sleep} from '../dateUtils';
import {logger} from '../../logger';
import {buildError} from '../errorUtil';

let mongoRetry = true;

mongoose.connection.on('disconnected', async () => {
	logger.warn('mongodb: default disconnected');
});

mongoose.connection.on('reconnect', () => {
	logger.info('mongodb: default reconnect');
});

mongoose.connection.on('connected', () => {
	logger.info('mongodb: default connected');
});

export async function startMongooseConnection(url: URL): Promise<void> {
	mongoRetry = true;
	logger.debug(`Connecting to MongoDB`);
	while (mongoRetry) {
		try {
			await mongoose.connect(url.href);
			mongoRetry = false;
			logger.info(`Connected to MongoDB`);
		} catch (err) {
			logger.error(`Failed to connect to MongoDB: ${buildError(err)}`);
			await sleep(1000);
		}
	}
}

export function closeMongooseConnection(): Promise<void> {
	mongoRetry = false;
	return mongoose.connection.close();
}
