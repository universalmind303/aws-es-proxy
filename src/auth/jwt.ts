import jwt from 'jsonwebtoken';
import config from '../config';

// const getKeyOrSecret = () => {
//   const jwt = config.auth.jwt;
//   if (jwt.key) {
//     return require('fs').readFileSync(jwt.key);
//   } else if (jwt.secret) {
//     return jwt.secret;
//   }
//   throw new Error('You must specify key or secret');
// };

// const keyOrSecret = getKeyOrSecret();

// const jwtAuth = async (req, res, next) => {
//   console.log('hello');
//   const authHeader = req.headers.authorization || '';
//   const match = authHeader.match(/Bearer (.+)/);

//   if (!match) {
//     res.status(401);
//     return next(new Error('User does not have sufficient permissions to access this resource'));
//   }

//   try {
//     const accessToken = match[1];
//     const decoded = jwt.verify(accessToken, keyOrSecret, {
//       algorithms: config.auth.jwt.algorithms,
//       audience: config.auth.jwt.audience,
//       issuer: config.auth.jwt.issuer,
//     });
//     req.jwt = decoded;
//     return next();
//   } catch (error) {
//     res.status(401);
//     return next({
//       error: error.innerError,
//       name: error.name,
//       message: error.message,
//     });
//   }
// };
export default {};

