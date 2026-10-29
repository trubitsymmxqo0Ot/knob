import { UserDto } from "../dto/userDto";
import { find } from "../repository/find";
import { tokenService } from "../token/service";
import { ReturnedDBUserValue, ReturnedUserValue } from "../types/types";
import { RequestSignInBody } from "./type";
import bcrypt from 'bcrypt';


class SignInService {
      async signIn(body: RequestSignInBody): Promise<ReturnedUserValue | undefined> {
        const {email, password} = body;
        const data = await find.findOneData<ReturnedDBUserValue>(email, 'email', 'user_data');
        const isActualUser = await bcrypt.compare(password, data.password)
        if(!isActualUser) throw new Error('Wrong email or password');
        const userDTO = new UserDto(data.name, data.email, data.createdAt, data.id);
        const tokens = tokenService.createTokens({...userDTO});
        const savedTokens = await tokenService.saveToken(userDTO.id, tokens.refreshToken);
        return {
          name: userDTO.name,
          email: userDTO.email,
          createdAt: userDTO.createdAt,
          refreshToken: savedTokens.refreshToken,
          accessToken: tokens.accessToken,
        }
      }
}

export const signInService = new SignInService();