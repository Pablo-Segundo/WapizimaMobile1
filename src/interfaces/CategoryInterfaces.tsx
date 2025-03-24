import {Product} from './ProductInterfaces';

export interface CategoriesResponse {
  categories: Category[];
}

export interface Category {
  _id:           string;
  name:          string;
  createdAt:     Date;
  url:           string;
  imagesMobile:  ImagesMobile;
  totalProducts: number;
}

export interface ImagesMobile {
  "400x400": string;
  "750x750": string;
  _id:       string;
}

export interface Subcategory {
  _id: string;
  name: string;
  category: string;
  status: boolean;
  products: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryResponse {
  subcategories: Subcategory[];
}

export interface Subcategory {
  _id: string;
  name: string;
  category: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  data: Product[];
}
