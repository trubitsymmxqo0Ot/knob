export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    role: SelectRole;
}

export interface SignUpResponse {
    name: string;
    email: string;
    createdAt: string;
    role: SelectRole;
}

export type SelectRole = 'frontend' | 'backend' | 'fullstack' | 'designer' | 'devops' |'other';