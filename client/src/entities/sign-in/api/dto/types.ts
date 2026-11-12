import type { SelectRole } from "entities/sign-up";

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    name: string;
    email: string;
    createdAt: string;
    role: SelectRole;
}