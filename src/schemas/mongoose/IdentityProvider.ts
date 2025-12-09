import {model, Schema, Model, HydratedDocument} from 'mongoose';
import {IdentityProvider} from '../../types/IdentityProvider';

type IdentityProviderModel = Model<IdentityProvider>;

const schema = new Schema<IdentityProvider, IdentityProviderModel>(
	{
		uuid: {type: String, required: true, unique: true},
		name: {type: String, required: true, unique: true},
		type: {type: String, required: true, index: true},
		disabled: {type: Boolean, required: true, default: false},
		props: {type: Schema.Types.Mixed, required: true},
		createdBy: {type: String, required: true},
		modifiedBy: {type: String, required: true},
	},
	{timestamps: {createdAt: 'created', updatedAt: 'modified'}},
);

export type IdentityProviderType = HydratedDocument<IdentityProvider>;

export const IdentityProviderModel = model('IdentityProvider', schema);
