import {ConfigMap, EnvConfigLoader, integerParser, stringParser, UrlParser} from '@avanio/variable-util';
import {DockerSecretsConfigLoader, DotEnvLoader, FileConfigLoader} from '@avanio/variable-util-node';
import {logger} from './logger';

const urlParse = new UrlParser({urlSanitize: true});
const dockerEnv = new DockerSecretsConfigLoader({fileLowerCase: true, isSilent: true, logger});
const fileEnv = new FileConfigLoader({fileName: './settings.json', fileType: 'json', logger});
const loaders = [new DotEnvLoader({}), new EnvConfigLoader(), fileEnv, dockerEnv];

type EnvVariables = {
	PORT: number;
	DATABASE_URL: URL;
	ENCRYPTION_KEY: string;
};

export const envConfig: ConfigMap<EnvVariables> = new ConfigMap<EnvVariables>(
	{
		PORT: {parser: integerParser(), defaultValue: 9457, params: {showValue: true}},
		DATABASE_URL: {parser: urlParse, params: {showValue: true}, undefinedThrowsError: true},
		ENCRYPTION_KEY: {parser: stringParser(), params: {showValue: false}, undefinedThrowsError: true},
	},
	loaders,
);
