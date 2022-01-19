import { NextFunction, Response } from 'express';
import Users from 'src/models/users.models';
import BaseReq from 'src/shared/utils/baseRequest';
import { verifyToken } from 'src/shared/utils/jwt';
import { handleFailure } from 'src/shared/utils/responseHandler';

export const isAuthorized = async (
  req: BaseReq,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (typeof authorization === 'undefined') {
    return handleFailure(
      401,
      'Unauthorized - Header Not Set',
      undefined,
      req,
      res
    );
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return handleFailure(
      401,
      'Access Denied. Please Log In.',
      undefined,
      req,
      res
    );
  }

  try {
    const decoded = verifyToken(token, req, res);
    const user = await Users.findByPk(decoded.id);
    if (user) {
      req.user = user.toJSON();
      next();
    } else {
      return handleFailure(
        401,
        'Access Denied. Please Log In.',
        undefined,
        req,
        res
      );
    }
  } catch (error) {
    return handleFailure(
      401,
      'Error in verification. Please try again',
      undefined,
      req,
      res
    );
  }
};

export default isAuthorized;

// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { config } from 'dotenv-safe';
// import passport from 'passport';
// import Users from 'src/db/models/users.models';

// config();

// interface Payload {
//   jwtFromRequest: any;
//   secretOrKey: string;
// }
// const opts = {} as Payload;

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.SECRET_KEY;

// passport.use(
//   new JwtStrategy(opts, (jwt_payload, done) => {
//     const user = Users.findOne({ where: { id: jwt_payload.id } });
//     if (user) {
//       return done(null, user);
//     }
//     return done(null, false);
//   })
// );
