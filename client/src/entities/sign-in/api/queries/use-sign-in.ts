import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "shared/ui/auth/auth-context";
import type { SignInResponse, SignInRequest } from "../dto/types";
import type { AxiosError } from "axios";
import { addToast } from "@heroui/toast";
import { signInKeys } from "../query-keys/sign-in-keys";
import { flushSync } from "react-dom";
import { signInContracts } from "../contracts/sign-in-contacts";
import { redirectConfig } from "shared/config/redirect-config";


export const useSignIn = () => {
    const queryClient = useQueryClient();
    const {setIsLogin} = useAuth();

    return useMutation({
        mutationFn: async ({user, signal}: {user: SignInRequest, signal?: AbortSignal}): Promise<SignInResponse> => {
            const data = await signInContracts.login(user, signal);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: signInKeys.root});
            flushSync(() => setIsLogin?.(true));
            redirectConfig.login({replace: true});
        },
        onError: (error: AxiosError) => {
            if(Array.isArray(error.message)) {
                error.message.forEach(message => {
                    addToast({
                        title: 'Ошибка входа',
                        description: message,
                        variant: 'flat',
                        color: 'danger',
                        timeout: 3000,
                    })
                })
            } else {
                addToast({
                    title: "Ошибка входа",
                    description: error.message || 'Неизвестная ошибка',
                    variant: 'flat',
                    color: 'danger',
                    timeout: 3000,
                })
            }
        }
    })

}