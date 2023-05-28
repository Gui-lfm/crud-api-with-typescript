import bcrypt from 'bcryptjs';
import jwtUtils from '../utils/jwt.utils';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Login } from '../types/Login';
import { Token } from '../types/Token';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  if (!login.username || !login.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }

  const userExists = await UserModel.findOne({ where: { username: login.username } });

  if (!userExists || !bcrypt.compareSync(login.password, userExists.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = userExists.dataValues;

  const token = jwtUtils.sign({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  verifyLogin,
};