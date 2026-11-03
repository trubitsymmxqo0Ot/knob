export const ACCESS_KEY = 'accessToken';

const cookieToken = async () => {
    try {
        const cookie = await cookieStore.get(ACCESS_KEY);
        return cookie?.value;
    }  catch {
        return undefined;
    }
} 

export const getToken = await cookieToken();
