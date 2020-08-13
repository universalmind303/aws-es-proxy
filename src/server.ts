
import * as http from 'http';
import {createTerminus} from '@godaddy/terminus';
import config from './config';
import {app} from './expressApp';
import {logger} from './logger';

const getTerminusOptions = ({logger}) => ({
  signals: ['SIGINT', 'SIGTERM'],
  health: () => {
    console.log("health")
  },
  onShutdown: () => logger.info('Shutting down application'),
  logger: logger.info,
});


const getServer = ({app, createTerminus, http, logger, getTerminusOptions}) => {
  const terminusOptions = getTerminusOptions({logger});

  const server = http.createServer(app);
  createTerminus(server, terminusOptions);

  server.listen(config.server.port);

  logger.info('Starting server on port %d', config.server.port);
  return server;
};


export default {
  getServer,
  getTerminusOptions,
  server: getServer({app, createTerminus, http, logger, getTerminusOptions}),
};
