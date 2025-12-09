interface CommonIdentityProvider {
    uuid: string;
	name: string;
	disabled: boolean;
	createdBy: string;
	modifiedBy: string;
	readonly created: Date;
	readonly modified: Date;
}

export interface IdentityProviderAad extends CommonIdentityProvider {
	type: 'aad';
	props: {allowedIssuers?: string[]};
}

export type IdentityProvider = IdentityProviderAad;
