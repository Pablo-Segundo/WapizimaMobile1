export interface loginData {
  email: string;
  password: string;
}
export interface ResetPasswordData {
  email: string;
}
export interface updateUserData {
  fullname: string;
  phone_number: Phone;
}
export interface MessageResponse {
  message: string;
}
export interface changePasswordData {
  actual_password: string;
  new_password: string;
  confirm_new_password: string;
}
export interface verifyNumberData {
  phone_number: string;
  prefix: string;
}

export interface VerifyPhoneResponse {
  token: string;
  code: string;
  phone_number: string;
}

export interface verifyCodeData {
  code: string;
}

export interface verifyCodeResponse {
  data: string;
  message: string;
}

export interface registerGoogleData {
  idToken: string;
}
export interface registerAppleData {
  idToken: string | null;
  nonce: string;
  fullName: object | null; 
}

export interface Direction {
  name: string;
  street: string;
  between_street: string;
  postalcode: string;
  phone_number:string;
  city: string;
  colony: string;
  references: string;
  no_int: string;
  no_ext: string;
  state: string;
  municipality: string;
  _id?: string;
  type_direction: number;
  country?: string;
}

export interface Phone {
  _id: string;
  code: string;
  verified: boolean;
  expiration_date: string;
  prefix: string;
  phone_number: string;
  createdAt: string;
  updatedAt: string;
}

export interface saveDirectionResponse {
  directions: Direction[];
  message: string;
}
