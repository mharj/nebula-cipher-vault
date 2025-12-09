import {IdentityProvider} from '../types/IdentityProvider';
import {SecretKey} from '../types/SecretKey';
import {SecretValue} from '../types/SecretValue';

export interface IDataSource {
	connect(url: URL): Promise<void>;
	close(): Promise<void>;
	listIdentityProviders(): Promise<IdentityProvider[]>;
	addIdentityProvider(identityProvider: IdentityProvider): Promise<void>;
	removeIdentityProvider(uuid: string): Promise<void>;
	listSecretKeys(): Promise<SecretKey[]>;
	addSecretValue(name: string, secretValue: SecretValue): Promise<void>;
	removeSecretValue(name: string, version: string): Promise<void>;
	getCurrentSecretValue(name: string): Promise<SecretValue | undefined>;
	onIdentityProviderUpdate: (callback: () => void) => void;
}
