
export interface ReturnedUserValue {
  id: string;
  email: string;
  name: string;
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
}

export interface ReturnedDBUserValue {
  id: string;
  createdAt: string
  email: string;
  name: string;
  password: string;
  isActive: boolean;
}

export interface ReturnedDBTokensValue {
  id: string;
  createdAt: string;
  refreshToken: string;
  userId: string;
}