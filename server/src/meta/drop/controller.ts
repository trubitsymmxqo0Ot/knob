import { Request, Response } from "express";
import { metaServices } from "./services";

class MetaController {
    async clearDb(req: Request, res: Response) {
        try {
            const clear = metaServices.clearDb();
            if(!clear) throw new Error('Failed to drop databases')
            return res.status(200).json('All db was clear')
        } catch(e) {
            if(e instanceof Error) {
                throw new Error('Cannot clear db');
            }
        }
    }
}

export const metaController = new MetaController();