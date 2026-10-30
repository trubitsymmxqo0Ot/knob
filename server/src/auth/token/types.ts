import { UserDTOResponse } from "../../auth/dto/types/user-types";

export interface ReturnedTokens {
    accessToken: string;
    refreshToken: string;
}

export interface TokenServiceResponse {
    createTokens: (payload: UserDTOResponse) => ReturnedTokens;
}

export interface DataFromRefToken {
    name: string;
    email: string;
    createdAt: string;
    id: string;
    lat: number;
    exp: number;
} 