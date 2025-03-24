export interface RegisterData {
    email: string;
    password: string;
    fullname: string;
}

export interface RegisterResponse {
    user: User;
    token: string;
}

export interface LoginResponse {
    user: User;
    cart: boolean;
    token: string;
}

export interface User {
    fullname: string;
    email: string;
    stripe_customer: string;
    google: boolean;
    phone: Phone;
    status: boolean;
    email_verified: boolean;
    influencer: boolean;
    createdAt: string;
    updatedAt: string;
    profileImage: string;
    id: string;
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

export interface UpdateImageResponse {
    message: string;
    profileImage: string;
}
export interface Phoneprofile {
    phone_number: string;
}
