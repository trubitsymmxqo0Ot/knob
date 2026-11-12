import { SelectRole } from "../../types/types";

export interface DBUserResponse {
    id: string;
    createdAt: string;
    email: string;
    name: string;
    password: string;
    role: SelectRole;
}