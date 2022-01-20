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

export interface ICard {
  id: number;
  name: string;
  counts: number;
  balance: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ITransaction {
  id: number;
  counts: number;
  reference: string;
  category: string;
  amount: number;
  merchant: string;
  transactionType: 'debit' | 'credit';
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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
