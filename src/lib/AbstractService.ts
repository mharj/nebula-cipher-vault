import {EventEmitter} from 'node:events';
import type {INamedService, IServiceControl} from '../interfaces/Service';

export abstract class AbstractService extends EventEmitter implements INamedService, IServiceControl {
	public abstract readonly serviceName: string;

	public async start() {
		this.emit('preStart');
		await this.handleStart();
		this.emit('postStart');
		this.emit('running', true);
	}
	public async stop() {
		this.emit('preStop');
		await this.handleStop();
		this.emit('postStop');
		this.emit('running', false);
	}
	public abstract handleStart(): Promise<void>;
	public abstract handleStop(): Promise<void>;
}
