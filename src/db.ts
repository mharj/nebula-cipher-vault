import {envConfig} from './env';
import {mongooseDataSource} from './lib/mongoose';

function getDataSource(url: URL) {
	switch (url.protocol) {
		case 'mongodb:':
		case 'mongodb+srv:':
			return mongooseDataSource;
		default:
			throw new Error(`Unsupported database protocol ${url.protocol}`);
	}
}

export async function startDatabaseConnection() {
	const databaseUrl = await envConfig.get('DATABASE_URL');
	const dataSource = getDataSource(databaseUrl);
	dataSource.connect(databaseUrl);
}

export async function stopDatabaseConnection() {
	const databaseUrl = await envConfig.get('DATABASE_URL');
	const dataSource = getDataSource(databaseUrl);
	dataSource.close();
}
