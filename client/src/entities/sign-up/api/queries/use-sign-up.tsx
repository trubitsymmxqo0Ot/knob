import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUpKeys } from '../query-keys/sign-up-keys';
import type { AxiosError } from 'axios';
import { addToast } from '@heroui/toast';
import { useAuth } from 'shared/ui/auth/auth-context';
import { flushSync } from 'react-dom';
import { signUpContracts } from '../contracts/sign-up-api';
import type { SignUpRequest, SignUpResponse } from '../dto/sign-up-data';
import { redirectConfig } from 'shared/config/redirect-config';

export function useSignUp() {
    const queryClient = useQueryClient();
    const { setIsLogin } = useAuth();
    
    return useMutation({
        mutationFn: async ({ user, signal }: { user: SignUpRequest, signal?: AbortSignal }): Promise<SignUpResponse> => {
            const data = await signUpContracts.register({user, signal});
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: signUpKeys.root });
            flushSync(() => setIsLogin?.(true));
            redirectConfig.profile({replace: true});
        },
        onError: (error: AxiosError) => {
            if (Array.isArray(error.message)) {
                error.message.forEach(message => {
                    addToast({
                        title: 'Ошибка регистрации',
                        description: message,
                        variant: 'flat',
                        color: 'danger',
                        timeout: 3000,

                    }
                    )
                });
            } else {
                addToast({
                    title: 'Ошибка регистрации',
                    description: error.message || 'Неизвестная ошибка',
                    variant: 'flat',
                    color: 'danger',
                    timeout: 3000,
                });
            }

        },
    })

}
