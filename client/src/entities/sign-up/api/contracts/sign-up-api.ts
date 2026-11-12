import { api } from "shared/api/api"
import type { SignUpRequest, SignUpResponse } from "../dto/sign-up-data";


export const signUpContracts = {
    register: async ({ user, signal }: {user: SignUpRequest, signal?: AbortSignal}): Promise<SignUpResponse> => {
        const { name, email, password , role} = user;
        const { data } = await api.post<SignUpResponse>(
            'user/sign-up',
            { name, email, password, role },
            { signal }
        );
        return data;
    }
}
