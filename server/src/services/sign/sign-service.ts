import { DBUserResponse } from '../../dto/types/user-types';
import { UserDTO } from '../../dto/userDTO';
import { find } from '../../repository/find';
import { save } from '../../repository/save';
import { SignServiceResponse, SignUpBody, ReturnedValue } from './types';
import bcrypt from 'bcrypt';

class SignService implements SignServiceResponse {
  async signUp(body: SignUpBody): Promise<ReturnedValue | undefined> {
    const { email, name, password } = body;
    const findUser = await find.hasUser(email, 'user_data');
    if (findUser) {
      throw new Error('User already exist');
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const saveUser = await save.saveOneUser({ email, name, password: hashPassword }, 'user_data')
    const userDTO = new UserDTO(saveUser.name, saveUser.email, saveUser.createdAt);

    return {
      email: userDTO.email,
      name: userDTO.name,
      createdAt: userDTO.createdAt
    }
  }
}

export const signService = new SignService(); 