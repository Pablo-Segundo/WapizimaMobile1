export interface AccountsResponse {
  bankAccounts: BankAccount[];
}

export interface BankAccount {
  _id: string;
  account_number: string;
  interbank: string;
  beneficiary: string;
  rfc: string;
  bank: Bank;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  label: string;
}

export interface Bank {
  _id: string;
  name: string;
  status: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}
