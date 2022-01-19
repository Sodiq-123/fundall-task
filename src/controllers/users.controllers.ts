import { Request, Response } from 'express';
import UserService from 'src/services/users.service';
import { handleFailure, handleSuccess } from 'src/shared/utils/responseHandler';

export default class UserController {
  public static async createAccount(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);
      return handleSuccess(201, 'account created', { token: user }, req, res);
    } catch (e) {
      return handleFailure(400, e.message, undefined, req, res);
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const user = await UserService.login(req.body);
      return handleSuccess(200, 'successful login', { token: user }, req, res);
    } catch (e) {
      return handleFailure(401, e.message, undefined, req, res);
    }
  }
}
