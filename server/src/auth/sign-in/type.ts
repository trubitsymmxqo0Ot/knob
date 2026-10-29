import { Request } from "express";

export interface RequestSignInBody {
  email: string;
  password: string;
}
export type SignInParams = Request<{}, {}, RequestSignInBody>
