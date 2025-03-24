import { Product } from "./ProductInterfaces";

export interface Brand {
  _id: string;
  name: string;
  images: Images;
}
export interface Images {
  "400x400":   string;
  "750x750":   string;
  "1000x1000": string;
  "1400x1400": string;
  _id:         string;
}

export interface BrandsResponse {
  brands: Brand[];
}

export interface Category {
  _id: string;
  name: string;
  data: Product[];
  subcategories: Subcategory[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
  images: Images[];
}

export interface Subcategory {
  _id: string;
  name: string;
  category: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}

export interface SubcategoriesResponse {
  subcategories: Subcategory[];
}

export interface CategoriesResponse {
  categories: Category[];
}
export interface Category {
  _id: string;
  name: string;
  subcategories: Subcategory[];
  status: boolean;
  data: Product[];
  imageMobile: string;
  imageWeb: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  pagination: Pagination;
}
export interface Tag {
  tag_id: string;
  _id: string;
}

export interface Pagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: number;
  _id: string;
}
