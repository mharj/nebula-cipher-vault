import type {RequestHandler} from 'express';

const allowHosts = new Set([
	'http://localhost:3000',
	'http://localhost:8080',
	'https://sahara-lan.firebaseapp.com',
	'https://sahara-auth.firebaseapp.com',
	'https://luolapeikko.fi',
]);

export const corsMiddleWare: RequestHandler = (req, res, next) => {
	let {origin} = req.headers;
	if (Array.isArray(origin)) {
		origin = origin[0];
	}
	if (origin && allowHosts.has(origin)) {
		res.set('Access-Control-Allow-Origin', origin);
		res.set('Access-Control-Allow-Credentials', 'true');
		res.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
		res.set('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, if-none-match, if-match, x-api-version');
		res.set('Access-Control-Expose-Headers', 'etag, x-api-version');
		res.set('Access-Control-Max-Age', '86400'); // pre-flight cache time
		res.set('Vary', 'Origin');
	}
	if (req.method === 'OPTIONS') {
		res.status(204).end();
	} else {
		next();
	}
};
