import {SecretValueType} from '../../schemas/mongoose/SecretValue';
import {SecretValue} from '../../types/SecretValue';

export function mapToSecretValue(model: SecretValueType): SecretValue {
	return {
		version: model.version,
		value: model.value,
		disabled: model.disabled,
		contentType: model.contentType,
		start: model.start,
		end: model.end,
		tags: model.tags,
		createdBy: model.createdBy,
		modifiedBy: model.modifiedBy,
		created: model.created,
		modified: model.modified,
	};
}
