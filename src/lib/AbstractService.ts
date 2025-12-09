import {INamedService, IServiceControl, IServiceStatus} from '../interfaces/Service';

export abstract class AbstractService implements INamedService, IServiceStatus, IServiceControl {
	public abstract readonly serviceName: string;
	private handlePreStart = new Set<() => Promise<void>>();
	private handlePostStart = new Set<() => Promise<void>>();
	private handlePreStop = new Set<() => Promise<void>>();
	private handlePostStop = new Set<() => Promise<void>>();
	private handleRunning = new Set<(isRunning: boolean) => void>();

	public async start() {
		await Promise.all(Array.from(this.handlePreStart).map((cb) => cb()));
		await this.handleStart();
		this.handleRunning.forEach((cb) => cb(true));

		await Promise.all(Array.from(this.handlePostStart).map((cb) => cb()));
	}
	public async stop() {
		await Promise.all(Array.from(this.handlePreStop).map((cb) => cb()));
		await this.handleStop();
		this.handleRunning.forEach((cb) => cb(false));
		await Promise.all(Array.from(this.handlePostStop).map((cb) => cb()));
	}
	public onPreStart(callback: () => Promise<void>) {
		this.handlePreStart.add(callback);
	}
	public onPostStart(callback: () => Promise<void>) {
		this.handlePostStart.add(callback);
	}
	public onPreStop(callback: () => Promise<void>) {
		this.handlePreStop.add(callback);
	}
	public onPostStop(callback: () => Promise<void>) {
		this.handlePostStop.add(callback);
	}
	public onRunning(onRunning: (isRunning: boolean) => void): void {
		this.handleRunning.add(onRunning);
	}

	public abstract handleStart(): Promise<void>;
	public abstract handleStop(): Promise<void>;
}
