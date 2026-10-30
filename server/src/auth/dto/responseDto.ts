export class responseDto {
    name: string;
    email: string;
    createdAt: string;
    constructor(name: string, email: string, createdAt: string) {
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }
}