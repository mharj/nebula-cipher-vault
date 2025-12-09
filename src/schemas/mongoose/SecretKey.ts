import {model, Schema, Model, HydratedDocument} from 'mongoose';
import {SecretKey} from '../../types/SecretKey';
type SecretKeyModel = Model<SecretKey>;

const schema = new Schema<SecretKey, SecretKeyModel>(
	{
		name: {type: String, required: true, index: true},
		createdBy: {type: String, required: true},
		modifiedBy: {type: String, required: true},
	},
	{timestamps: {createdAt: 'created', updatedAt: 'modified'}},
);

export type SecretKeyType = HydratedDocument<SecretKey>;

export const SecretKeyModel = model('SecretKey', schema);
