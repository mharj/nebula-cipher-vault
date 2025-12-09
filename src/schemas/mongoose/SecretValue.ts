import {model, Schema, Model, HydratedDocument, Types} from 'mongoose';
import {SecretValue} from '../../types/SecretValue';
type SecretValueWithKey = SecretValue & {key: Types.ObjectId};
type SecretValueModel = Model<SecretValueWithKey>;


const schema = new Schema<SecretValueWithKey, SecretValueModel>(
	{
		key: {type: Schema.Types.ObjectId, ref: 'SecretKey'},
		version: {type: String, required: true, index: true},
		value: {type: String, required: true},
		disabled: {type: Boolean, required: true, default: false},
		contentType: {type: String},
		start: {type: Date},
		end: {type: Date},
		tags: {type: [String]},
		createdBy: {type: String, required: true},
		modifiedBy: {type: String, required: true},
	},
	{timestamps: {createdAt: 'created', updatedAt: 'modified'}},
);

export type SecretValueType = HydratedDocument<SecretValueWithKey>;

export const SecretValueModel = model('SecretValue', schema);
