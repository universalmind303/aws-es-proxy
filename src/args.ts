import yargs from 'yargs';

yargs.usage('usage: $0 [options] <aws-es-cluster-endpoint>')
    .option('p', {
      alias: 'port',
      default: process.env.PORT || 9200,
      demand: false,
      describe: 'the port to bind to',
      type: 'number',
    })
    .option('s', {
      alias: 'secret',
      default: process.env.CLIENT_SECRET,
      demand: false,
      describe: 'okta client secret',
      type: 'string',
    })
    .option('c', {
      alias: 'config',
      default: './proxy-config.yml',
      demand: false,
      describe: 'the path to config file',
      type: 'string',
    })
    .help()
    .version()
    .strict();
export default yargs.argv;


