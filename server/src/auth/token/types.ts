import { UserDTOResponse } from "../../auth/dto/types/user-types";

export interface ReturnedTokens {
    accessToken: string;
    refreshToken: string;
}

export interface TokenServiceResponse {
    createTokens: (payload: UserDTOResponse) => ReturnedTokens;
}

