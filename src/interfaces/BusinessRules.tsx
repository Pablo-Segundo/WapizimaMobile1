export interface BusinesRule {
    business_rules: BusinessRule[];
}

export interface BusinessRule {
    _id:              string;
    minimum_money?:   number;
    maximum_money?:   number;
    discount?:        number;
    type:             number;
    status:           boolean;
    createdAt:        Date;
    updatedAt:        Date;
    minimum_weigth?:  number;
    maximum_weigth?:  number;
    type_direction?:  number;
    shippment_costs?: number;
}
