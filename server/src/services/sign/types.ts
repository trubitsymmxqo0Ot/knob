export interface SignUpBody {
  email: string;
  name: string;
  password: string;
}

export interface ReturnedValue {
  email: string;
  name: string;
  createdAt: string;
}

export interface SignServiceResponse {
  signUp: (body: SignUpBody) => Promise<ReturnedValue | undefined>;
}