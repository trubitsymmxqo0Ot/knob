export const ACCESS_KEY = 'accessToken';

export const cookieToken = async () => {
    try {
        if(typeof cookieStore === 'undefined') return undefined; 
        const cookie = await cookieStore.get(ACCESS_KEY);
        return cookie?.value;
    }  catch {
        return undefined;
    }
} 
