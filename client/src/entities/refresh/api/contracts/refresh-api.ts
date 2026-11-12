import { api } from "shared/api/api";
import type { ResponseRefreshDto } from "../dto/type";

export const refreshApi = {
    refresh: async (signal?: AbortSignal): Promise<ResponseRefreshDto> => {
        const response = await api.get<ResponseRefreshDto>('user/refresh', { signal });
        return response.data;
    }
}