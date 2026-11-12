import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { BASE_KEY } from 'shared/config/base.key'
import { cookieToken } from 'shared/config/getToken';

export const api = axios.create({
    baseURL: BASE_KEY,
    withCredentials: true,
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token = await cookieToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use((config: AxiosResponse) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    if (status >= 400 && status < 500 || !originalRequest) {
        if(!originalRequest._retry) {
            return Promise.reject(error.response.data);
        }
    }

    if (error.response.status === 401 || !originalRequest) {
        try {
            const response = await axios.get(`${BASE_KEY}/user/refresh`, { withCredentials: true });
            cookieStore.set('accessToken', response.data.accessToken);
            cookieStore.set('refreshToken', response.data.refreshToken);
            return api.request(originalRequest);
        } catch (e) {
            if(e instanceof AxiosError){
                return Promise.reject(e?.response?.data);
            }
            return Promise.reject(e);
        }
    }
})
