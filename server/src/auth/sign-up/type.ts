import { Request } from "express";
import { RequestUserBody } from "../types/types";

export type Params = Request<{}, {}, RequestUserBody>