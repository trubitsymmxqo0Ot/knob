import { Request, Response } from "express";
import { cookiesObject } from "../lib/cookies";
import { deleteServices } from "./services";

class DeleteController {
    async delete(req: Request, res: Response) {
        try {
            const token = await cookiesObject.getRefreshToken(req);
            const deleted = await deleteServices.delete(token);
            if (!deleted) throw new Error('Failed to delete user');
            cookiesObject.deleteBothTokens(res);
            return res.status(200).json('');
        } catch (e) {
            res.status(500).json('An unknown error occured while delete from account');
        }
    }
}

export const deleteController = new DeleteController();