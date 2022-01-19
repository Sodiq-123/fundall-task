import * as bcrypt from 'bcrypt';
import { createUserDTO, loginUserDTO } from 'src/shared/dto/users.dto';
import Users from 'src/models/users.models';
import UserWithThatEmailAlreadyExistsException from 'src/shared/exception/exceptionResponse';
import { generateToken } from 'src/shared/utils/jwt';
import BadRequestException from 'src/shared/exception/BadRequestException';

export default class UserService {
  public static async create(body: createUserDTO) {
    const existingUser = await Users.findOne({ where: { email: body.email } });
    if (existingUser) {
      throw new UserWithThatEmailAlreadyExistsException(body.email);
    }
    try {
      const user = await Users.create(body);
      return generateToken({ id: user.id });
    } catch (error) {
      throw new BadRequestException('failed to create an account');
    }
  }

  public static async login(body: loginUserDTO) {
    const user = await Users.findOne({ where: { email: body.email } });
    if (user && bcrypt.compareSync(body.password, user.password)) {
      return generateToken({ id: user.id });
    }
    throw new BadRequestException('invalid credentials');
  }
}
