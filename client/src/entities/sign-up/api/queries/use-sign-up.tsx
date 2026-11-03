import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api/api';
import type { SignUpRequest, SignUpResponse } from '../dto/sign-up-data';
import { signUpKeys } from '../query-keys/signUpKeys';
import {addToast} from '@heroui/toast';
import type { AxiosError } from 'axios';

export function useSignUp() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ user }: { user: SignUpRequest }): Promise<SignUpResponse> => {
            const { data } = await api.post<SignUpResponse>('user/sign-up', user);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: signUpKeys.root });
        },
        onError: (error: AxiosError) => {
            console.log(error);
            addToast({
                title: "Ошибка регистрации",
                description: 'Ошибка при регистрации',
            });
        },
    })

}
