import { Response, Request } from "express"
import { parsecookie } from "./parse-cookie"

class Cookies {
    refreshKey = 'refreshToken';
    accessKey = 'accessToken';

    saveTokens(res: Response, refreshToken: string, accessToken: string) {
        res.cookie(this.refreshKey, refreshToken, {
            httpOnly: true,
            maxAge: parsecookie(30, 'days')
        }
        )

        res.cookie(this.accessKey, accessToken, {
            maxAge: parsecookie(30, 'minutes')
        })
    }

    getRefreshToken(req: Request): Promise<string | undefined> {
        const {refreshToken} = req.cookies;
        return refreshToken;
    }

    deleteBothTokens(res: Response) {
        res.clearCookie(this.refreshKey);
        res.clearCookie(this.accessKey);
    }
}

export const cookiesObject = new Cookies(); 