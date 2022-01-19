import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv-safe';
import { handleFailure } from '../../shared/utils/responseHandler';

config();

const secret: string = process.env.SECRET_KEY;

interface Payload {
  id: number;
}

const generateToken = async (payload: Payload, exp = '5d') =>
  jwt.sign(payload, secret, {
    expiresIn: exp,
  });

const verifyToken = (token: any, req: Request, res: Response): any =>
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return handleFailure(401, 'unauthorized', '', req, res);
    }
    return decoded;
  });
export { generateToken, verifyToken };
