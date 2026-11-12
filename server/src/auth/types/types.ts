export type SelectRole = 'frontend' | 'backend' | 'fullstack' | 'designer' | 'devops' |'other';

export interface ReturnedUserValue {
  id: string;
  email: string;
  name: string;
  role: SelectRole;
  createdAt: string;
  accessToken: string;
  refreshToken: string;
}

export interface DBTokenResponse {
    id: string;
    refreshToken: string;
    userId: string;
    createdAt: string;
}

export interface RequestUserBody {
    email: string;
    name: string;
    password: string;
    role: SelectRole;
}

export interface ReturnedDBUserValue {
  id: string;
  createdAt: string
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  role: SelectRole;
}

export interface ReturnedDBTokensValue {
  id: string;
  createdAt: string;
  refreshToken: string;
  userId: string;
}