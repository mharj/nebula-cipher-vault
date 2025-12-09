import {IDataSource} from '../../interfaces/IDataSource';
import {IdentityProviderModel} from '../../schemas/mongoose/IdentityProvider';
import {SecretKeyModel} from '../../schemas/mongoose/SecretKey';
import {SecretValueModel} from '../../schemas/mongoose/SecretValue';
import {IdentityProvider} from '../../types/IdentityProvider';
import {CreateSecretKey, SecretKey} from '../../types/SecretKey';
import {SecretValue} from '../../types/SecretValue';
import {closeMongooseConnection, startMongooseConnection} from './helppers';
import {mapToSecretValue} from './mapper';

export class MongooseDataSource implements IDataSource {
	private handleIdentityProviderUpdate = new Set<() => void>();
	public connect(url: URL): Promise<void> {
		return startMongooseConnection(url);
	}
	public close(): Promise<void> {
		return closeMongooseConnection();
	}
	public async listIdentityProviders(): Promise<IdentityProvider[]> {
		return (await IdentityProviderModel.find()).map<IdentityProvider>(({uuid, name, type, disabled, props, created, createdBy, modified, modifiedBy}) => ({
			uuid,
			name,
			type,
			disabled,
			props,
			created,
			createdBy,
			modified,
			modifiedBy,
		}));
	}
	public async addIdentityProvider(identityProvider: IdentityProvider): Promise<void> {
		await new IdentityProviderModel(identityProvider).save();
		this.notifyIdentityProviderUpdate();
	}

	public async removeIdentityProvider(uuid: string): Promise<void> {
		await IdentityProviderModel.deleteOne({uuid});
		this.notifyIdentityProviderUpdate();
	}

	public onIdentityProviderUpdate(callback: () => void): void {
		this.handleIdentityProviderUpdate.add(callback);
	}

	public async listSecretKeys(): Promise<SecretKey[]> {
		return (await SecretKeyModel.find()).map<SecretKey>(mapToSecretValue);
	}

	public async addSecretValue(name: string, secretKey: CreateSecretKey): Promise<void> {
		await new SecretKeyModel(secretKey).save();
	}

	public async removeSecretValue(name: string, version: string): Promise<void> {
		await SecretKeyModel.deleteOne({name, version});
	}

	public async getCurrentSecretValue(name: string): Promise<SecretValue | undefined> {
		const key = await SecretKeyModel.findOne({name});
		if (!key) {
			return;
		}
		const modelList = await SecretValueModel.find({$and: [{key: key._id}, {disabled: false}]}).sort({created: -1});
		const now = new Date();
		for (const model of modelList) {
			// check if key is expired
			if (model.end && model.end < now) {
				continue; // continue to next model
			}
			return mapToSecretValue(model);
		}
		return;
	}
	private notifyIdentityProviderUpdate(): void {
		for (const callback of this.handleIdentityProviderUpdate) {
			callback();
		}
	}
}

export const mongooseDataSource = new MongooseDataSource();
