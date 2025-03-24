export interface CouponsResponse {
    coupons: Coupon[];
}

export interface Coupon {
    _id: string;
    code: string;
    expiration_date: null | string;
    discount: number;
    type: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}
