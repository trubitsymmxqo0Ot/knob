import axios, {type AxiosResponse, type InternalAxiosRequestConfig} from 'axios'
import { BASE_KEY } from 'shared/config/base.key'
import { getToken } from 'shared/config/getToken'


export const api = axios.create({
    baseURL: BASE_KEY,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if(getToken) {
        config.headers.Authorization = `Bearer ${getToken}`;
    }
    return config;
})

api.interceptors.response.use((config: AxiosResponse) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 || !originalRequest) {
        try {
            await axios.get(`${BASE_KEY}/refresh`, {withCredentials: true});
            return api.request(originalRequest);
        } catch(e) {
            console.log(e);
        }
    }
})
