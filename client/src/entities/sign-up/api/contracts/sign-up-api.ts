import { api } from "shared/api/api"

interface SignUpApi {
    name: string;
    email: string;
    password: string;
    signal: AbortSignal;
}

export const signUpApi = async ({name, email, password, signal}: SignUpApi) => {
    const response = await api.post(
        'user/sign-up', 
        {name, email, password}, 
        {signal}
    );
    return response;
}