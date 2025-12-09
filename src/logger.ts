import {getLogger} from 'log4js';

export const logger = getLogger('console');
switch (process.env.NODE_ENV) {
	case 'test':
		logger.level = 'fatal';
		break;
	case 'production':
		logger.level = 'info';
		break;
	default:
		logger.level = 'debug';
}
logger.debug('logger loaded');
