export class UserDto {
    name: string;
    email: string;
    createdAt: string;
    id: string;
    constructor(name: string, email: string, createdAt: string, id: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }
}