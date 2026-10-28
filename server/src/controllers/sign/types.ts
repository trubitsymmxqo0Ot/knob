import {Request, Response} from 'express';

export interface RequestBody {
  email: string;
  name: string;
  password: string;
}

export type Params = Request<{}, {}, RequestBody>
export interface SignControllerRequest {
  signUp: (req: Params, res: Response) => Promise<Response>;
}