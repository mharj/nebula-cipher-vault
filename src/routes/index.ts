import {Router} from 'express';
import {getRouter as getSecretRouter} from './secret';

export function getRouter() {
	const router = Router();
	router.use('/secret', getSecretRouter());
	return router;
}
