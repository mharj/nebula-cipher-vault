export type SecretValue = {
	version: string;
	value: string;
	disabled?: boolean;
	contentType?: string;
	start?: Date;
	end?: Date;
	tags?: string[];
	createdBy: string;
	modifiedBy: string;
	readonly created: Date;
	readonly modified: Date;
};
