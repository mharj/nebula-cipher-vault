export interface INamedService {
	serviceName: string;
}

export interface IServiceStatus {
	onRunning(onRunning: (isRunning: boolean) => void): void;
}

export interface IServiceControl {
	start(): Promise<void>;
	stop(): Promise<void>;
	onPreStart(callback: () => Promise<void>): void;
	onPostStart(callback: () => Promise<void>): void;
	onPreStop(callback: () => Promise<void>): void;
	onPostStop(callback: () => Promise<void>): void;
}
