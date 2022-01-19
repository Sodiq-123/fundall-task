import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { CreateUser, LoginUser } from 'src/interfaces/user.interface';

export default class validate {
  public static async signUp(
    user: CreateUser,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = joi.object({
      email: joi.string().email().required().trim(),
      password: joi.string().min(8).max(255).required().trim(),
      firstname: joi.string().min(5).max(255).required().trim(),
      lastname: joi.string().min(5).max(255).required().trim(),
      phonenumber: joi.string().max(11).required().trim(),
    });
    const validation = schema.validate(user);
    if (validation.error) {
      return {
        success: false,
        message: validation.error.details[0].message,
      };
    }
    return next();
  }

  public static async login(
    user: LoginUser,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = joi.object({
      email: joi.string().email().required().trim(),
      password: joi.string().min(8).max(255).required().trim(),
    });
    const validation = schema.validate(user);
    if (validation.error) {
      return {
        success: false,
        message: validation.error.details[0].message,
      };
    }
    return next();
  }
}
