import { SelectRole } from "../types/types";

export class UserDto {
    name: string;
    email: string;
    createdAt: string;
    role: SelectRole;
    id: string;
    constructor(name: string, email: string, createdAt: string, id: string, role: SelectRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.role = role;
    }
}