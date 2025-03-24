export interface AddCartResponse {
  status: string;
  message: string;
  cart: Cart;
}

export interface Cart {
  _id: string;
  client_id: string;
  status: boolean;
  products: ProductCart[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductCart {
  product_id: Product;
  quantity: number;
  _id: string;
}

export interface Product {
  _id: string;
  barcode: string;
  name: string;
  short_description: string;
  description: string;
  quantity: number;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  price_purchase: number;
  status: boolean;
  multimedia: Multimedia[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  url: string;
  discount: number;
  product_type: string;
}

export interface Multimedia {
  path: string;
  _id: string;
}

export interface Tag {
  tag_id: string;
  _id: string;
}

export interface CalculateDiscountData {
  productsDiscount: ProductsDiscount[];
  productsWithoutDiscount: ProductsWithoutDiscount[];
  productsCanvas: ProductsCanvas[]
}

export interface ProductsCanvas {
  product_id: string;
  quantity: number | string;
  price: number
}
export interface ProductsDiscount {
  product_id: string;
  quantity: number | string;
  price: number
}

export interface ProductsWithoutDiscount {
  product_id: string;
  quantity: string;
  price: number;
}

export interface DiscountResponse {
  withoutDiscount: WithoutDiscount;
  withDiscount: WithDiscount;
  superTotal: SuperTotal;
  products: ProductElement[];
  client_secret?: string;
  order_id?: string;
  shipping: string;
  coupon: Coupon;
  business_rule: Business_rule | null;
}

export interface Business_rule {
  discount: number;
}

export interface Coupon {
  _id: string 
  discount: number;
}
export interface SuperTotal {
  subtotal: number;
  total: number;
}

export interface WithDiscount {
  total: number;
}

export interface WithoutDiscount {
  subtotal: number;
  discount: number;
  discount_percentage: number;
  total: number;
}

export interface CartResponse {
  cart: Cart;
}

export interface LoadCartData {
  products: ProductData[];
}

export interface ProductData {
  product_id: string;
  quantity: number;
}

export interface ProductElement {
  product: Product;
  total: number;
  quantity: number;
  subtotal: number;
  discount: number;
  product_id: string;
  _id: string;
}
