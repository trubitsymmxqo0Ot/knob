import { api } from "shared/api/api";
import type { SignInRequest, SignInResponse } from "../dto/types";

export const signInContracts = {
    login: async (user: SignInRequest, signal?: AbortSignal): Promise<SignInResponse> => {
            const {data} = await api.post<SignInResponse>('user/sign-in', user, {signal})
            return data;
    }
}