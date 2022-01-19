export interface CreateUser {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  password: string;
  merchant: string;
  createdAt: Date;
  updatedAt: Date;
}
