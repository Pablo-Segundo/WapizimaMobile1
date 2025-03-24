export interface OrdersResponse {
  orders: Order[];
}

export interface ProductsList {
  product: Product;
  total: number;
  quantity: number;
  subtotal: number;
  discount: number;
  product_id: string;
  _id: string;
}

export interface Product {
  barcode: string;
  name: string;
  short_description: string;
  description: string;
  category: string;
  url: string;
  subcategory: string;
  brand: string;
  tags: Tag[];
  price: number;
  discount: number;
  _id: string;
}

export interface OrderResponse {
  order: Order;
  stripe_payment: StripePayment;
  shipping: Shipping;
  payments: Payment[];
  total_payments: number,
  totalPayments: number,
}

export interface Order {
  _id: string;
  totalCurrency: number;
  client_id: ClientID;
  shippment: number;
  shippment_direction: ShippmentDirection;
  orderStatus: number;
  status: boolean;
  invoiced: boolean;
  currency:Currency;
  products_list: ProductsList[];
  expiration_date_invoice: string
  payments: any[];
  createdAt: string;
  updatedAt: string;
  stripe_id?: string;
  subtotal: number;
  total: number;
  folio: number;
  type: number;
  bank_account_id: Bank_account_id;
}
export interface Currency {
  _id:      string;
  currency: string;
}
export interface Bank_account_id {
  account_number: string,
  interbank: string,
  beneficiary: string,
  rfc:string,
  bank: Bank;
}
export interface Bank {
  name: string;
}
export interface ClientID {
  fullname: string;
  email: string;
  phone: Phone;
  id: string;
}

export interface Phone {
  code: string;
  prefix: string;
  phone_number: string;
  expiration_date: string;
  verified: boolean;
  _id: string;
  updatedAt: string;
  createdAt: string;
}

export interface Tag {
  tag_id: string;
  _id: string;
}
export interface Municipality {
  _id: string;
  name: string;
}
export interface State {
  _id: string;
  name: string;
}

export interface Multimedia {
  path: string;
  _id: string;
}

export interface ShippmentDirection {
  name: string;
  street: string;
  between_street: string;
  postalcode: string;
  city: string;
  references: string;
  no_int: string;
  default: boolean;
  state: State;
  municipality: Municipality;
  _id: string;
  updatedAt: string;
  createdAt: string;
}
export interface StripePayment {
  paymentDetail: PaymentDetail;
  payment: Payment;
}

export interface Payment {
  _id: string;
  amount: number;
  order_id: string;
  type: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentDetail {
  brand: string;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  installments: null;
  last4: string;
  mandate: null;
  network: string;
  three_d_secure: null;
  wallet: null;
}

export interface Checks {
  address_line1_check: null;
  address_postal_code_check: null;
  cvc_check: string;
}

export interface ResponseBilling {
  order: Order;
  payments: Payment[];
  shipping: Shipping;
}

export interface Payment {
  _id: string;
  amount: number;
  reference: string;
  order_id: string;
  type: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface Shipping {
  _id: string;
  order_id: string;
  statusShipping: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  no_guide?: string;
  urlShipping: string;
  shipment_id: ShipmentID;
}

export interface ShipmentID {
  _id: string;
  name: string;
  status: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}
