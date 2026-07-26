import type EventEmitter from 'node:events';

export interface INamedService {
	serviceName: string;
}

export type AbstractServiceEmitMap = {
	preStart: [];
	postStart: [];
	preStop: [];
	postStop: [];
	running: [isRunning: boolean];
};

export interface IServiceControl extends EventEmitter<AbstractServiceEmitMap> {
	start(): Promise<void>;
	stop(): Promise<void>;
}
