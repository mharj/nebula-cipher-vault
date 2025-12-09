import * as dotenv from 'dotenv';
import {ConfigMap, integerParser, env, UrlParser, stringParser} from '@avanio/variable-util';
import {DockerSecretsConfigLoader, FileConfigLoader} from '@avanio/variable-util-node';
import {logger} from './logger';

dotenv.config();

const urlParse = new UrlParser({urlSanitize: true});
const dockerEnv = new DockerSecretsConfigLoader({fileLowerCase: true, isSilent: true, logger}).getLoader;
const fileEnv = new FileConfigLoader({fileName: './settings.json', type: 'json', logger}).getLoader;
const loaders = [env(), fileEnv(), dockerEnv()];

type EnvVariables = {
	PORT: number;
	DATABASE_URL: URL;
	ENCRYPTION_KEY: string;
};

export const envConfig: ConfigMap<EnvVariables> = new ConfigMap<EnvVariables>({
	PORT: {loaders, parser: integerParser(), defaultValue: 9457, params: {showValue: true}},
	DATABASE_URL: {loaders, parser: urlParse, params: {showValue: true}, undefinedThrowsError: true},
	ENCRYPTION_KEY: {loaders, parser: stringParser(), params: {showValue: false}, undefinedThrowsError: true},
});
