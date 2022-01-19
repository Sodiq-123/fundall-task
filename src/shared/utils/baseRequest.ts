import { Request } from 'express';
import { IUser } from 'src/interfaces/user.interface';

export type BaseReq = Request & {
  user?: IUser;
};

export default BaseReq;
