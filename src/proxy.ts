import url from 'url';
import aws4 from 'aws4';
import AWS from 'aws-sdk';
import expressProxy from 'express-http-proxy';
import config from './config';
import {Request} from 'express';
import {CredentialsOptions} from 'aws-sdk/lib/credentials';


const opts = {
  host: config.aws.host,
  service: 'es',
  region: config.aws.region,
};


const getCredentials = async () => {

  const credentialProvider = new AWS.CredentialProviderChain();
  const credentials: any = await credentialProvider
      .resolvePromise()
      .catch(console.error);

  return {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
  } as CredentialsOptions;
};
const proxyReqOptDecorator = async (proxyReqOpts, srcReq: Request) => {
  const credentials = await getCredentials();

  const headers = aws4.sign({
    ...opts,
    path: srcReq.originalUrl,
    body: JSON.stringify(srcReq.body),
    headers: {
      'Content-Type': 'application/json',
    },
  }, credentials).headers;

  proxyReqOpts.headers = headers;
  return proxyReqOpts;
};

const proxyReqPathResolver = (req: any) => url.parse(req.originalUrl).path;

export const proxyHandler = expressProxy(config.aws.target, {
  proxyReqOptDecorator,
  proxyReqPathResolver,
} as expressProxy.ProxyOptions);

export default {
  proxyHandler,
};
