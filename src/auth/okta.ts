import OktaJwtVerifier from '@okta/jwt-verifier';
import config from '../config';
import {Request, Response, NextFunction} from 'express';
console.log('INITIALIZED');
const getOktaJwtVerifier = () => config.auth.okta.scopes ? new OktaJwtVerifier({
  issuer: config.auth.okta.issuer,
  assertClaims: {
    'scp.includes': config.auth.okta.scopes,
  },
}) : new OktaJwtVerifier({
  issuer: config.auth.okta.issuer,
});


const oktaAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next(new Error('User does not have sufficient permissions to access this resource'));
  }

  try {
    const accessToken = match[1];
    const audience = config.auth.okta.audience;
    await getOktaJwtVerifier().verifyAccessToken(accessToken, audience);
    return next();
  } catch (error) {
    res.status(401);
    return next({
      error: error.innerError,
      name: error.name,
      message: error.message,
    });
  }
};
export default oktaAuth;

