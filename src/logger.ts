import {createLogger, format, transports} from 'winston';
import expressWinston, {ErrorLoggerOptions, LoggerOptions, DynamicMetaFunction} from 'express-winston';
import uuidv4 from 'uuid/v4';
import {MESSAGE} from 'triple-beam';

const consoleTransport = new transports.Console({handleExceptions: true});

const ecsFormatter = format((info) => {
  const ecs: any = {};
  if (info.timestamp) {
    ecs['@timestamp'] = info.timestamp;
  }
  if (info.error) {
    ecs.error = info.error;
  }
  if (info.message) {
    ecs.message = info.message;
  }
  if (info.http) {
    ecs.http = info.http;
  }
  if (info.url) {
    ecs.url = info.http;
  }
  ecs.log = {
    level: info.level,
    logger: 'expressWinston',
  };
  ecs.labels = {
    application: 'elasticsearch-proxy',
  };
  info[MESSAGE] = JSON.stringify(ecs);
  return info;
});

const dynamicMetaFunction: DynamicMetaFunction = (req: any, res: any) => {
  const ecsFormat = {
    http: {} as any,
    url: {} as any,
    log: {
      logger: 'expressWinston',
    },
  };
  if (req) {
    ecsFormat.http.request = {
      method: req.method,
      bytes: req.socket.bytesRead,
      referrer: req.get('Referrer'),
      body: req.body,
    };
    ecsFormat.url = {
      full: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      original: req.originalUrl,
      path: req.path,
      domain: req.get('host'),
      scheme: req.protocol,
    };
  }
  if (res) {
    ecsFormat.http.response = {
      status_code: res.statusCode,
      response_time: res.responseTime,
    };
  }
  return ecsFormat;
};

const errorFormatter = (error) => {
  console.log('error', error);
  const customError = {
    error: {
      code: error.code,
      message: error.message,
      stack_trace: error.stack,
      id: uuidv4(),
    },
    log: {
      level: 'error',
      logger: 'expressWinston',
    },
  };
  return customError;
};

const winstonLogger = createLogger({
  format: format.combine(
      format.splat(),
      format.json(),
      format.timestamp(),
      ecsFormatter(),
  ),
  transports: [consoleTransport],
});

const baseProperties = {
  winstonInstance: winstonLogger,
  baseMeta: {
    labels: {
      application: 'elasticsearch-proxy',
    },
  }
};


const loggerConfig: LoggerOptions = {
  ...baseProperties,
  dynamicMeta: dynamicMetaFunction,
};

const errorLoggerConfig: ErrorLoggerOptions = {
  ...baseProperties,
  dynamicMeta: errorFormatter,
};

export const expressLogger = expressWinston.logger(loggerConfig);
export const expressErrorLogger = expressWinston.errorLogger(errorLoggerConfig);
export const logger = winstonLogger;
