export interface DBUserResponse {
    id: string;
    createdAt: string;
    email: string;
    name: string;
    password: string;
}

export interface RequestUserBody {
    email: string;
    name: string;
    password: string;
}