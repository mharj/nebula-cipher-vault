import type {ILoggerLike} from '@luolapeikko/logger-type';
import express from 'express';
import type {Server} from 'http';
import {AbstractService} from '../lib/AbstractService';
import {setupExpress} from '../middleware';
import type {Loadable} from '../types/Loadable';

export class ExpressService extends AbstractService {
	private portNumber: Loadable<number>;

	private express: express.Application;
	private server: undefined | Server;
	private logger: ILoggerLike | undefined;
	public constructor(portNumber: Loadable<number>, logger?: ILoggerLike) {
		super();
		this.logger = logger;
		this.portNumber = portNumber;
		this.express = express();
	}
	public readonly serviceName = 'ExpressService';
	public async handleStart(): Promise<void> {
		this.logger?.info(`ExpressService starting`);
		await setupExpress(this.express);
		const port = await this.getPortNumber();
		this.server = this.express.listen(port);
		this.logger?.info(`ExpressService listening on port ${port}`);
	}
	public handleStop(): Promise<void> {
		if (this.server) {
			this.logger?.info(`ExpressService stopping`);
			this.server.close();
			this.server = undefined;
			this.logger?.info(`ExpressService stopped`);
		}
		return Promise.resolve();
	}

	private getPortNumber(): number | Promise<number> {
		return typeof this.portNumber === 'function' ? this.portNumber() : this.portNumber;
	}
}
