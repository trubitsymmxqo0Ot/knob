import { SelectRole } from "../../types/types";

export interface UserDTOResponse {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    role: SelectRole;
}