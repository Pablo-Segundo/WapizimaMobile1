export interface CurrencyResponse {
    currencies: Currency[];
}

export interface Currency {
    _id:       string;
    currency:  string;
    status:    boolean;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
    label: string;
}
