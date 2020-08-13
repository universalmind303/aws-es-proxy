import YAML from 'yaml';
import argv from './args';
import fs from 'fs';

const file = fs.readFileSync(argv.c as string, 'utf8');
const yamlConfig = YAML.parse(file);
if (yamlConfig.auth.provider == 'okta') {
  yamlConfig.auth.okta['client_secret'] = argv.secret;
  yamlConfig.auth.okta['appBaseUrl'] = `http://${argv.b}:${argv.p}`;
}

if (yamlConfig.auth.provider === 'jwt' &&
  yamlConfig.auth.jwt.key &&
  yamlConfig.auth.jwt.secret) {
  console.warn(
      `
JWT provider requires either a secret or a public key. It can not have both
Please check your config file.
`);
  process.exit(0);
}
if (yamlConfig.auth.provider === 'jwt' &&
  !yamlConfig.auth.jwt.key &&
  !yamlConfig.auth.jwt.secret) {
  console.warn(
      `
JWT provider requires either a secret or a public key.
Please check your config file.
`);
  process.exit(0);
}

yamlConfig.aws.host = yamlConfig.aws.target.split('://')[1];
yamlConfig.server.port = argv.port;
export const config = {...yamlConfig, ...argv};
export default {...yamlConfig, ...argv};
