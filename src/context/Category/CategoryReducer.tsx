import {Category} from '../../interfaces/CategoryInterfaces';
import {Product} from '../../interfaces/ProductInterfaces';
import {Subcategory} from '../../interfaces/SubcategoryInterface';

export interface CategoryState {
  errorMessage: string;
  category: Category | null;
  categories: Category[];
  subcategories: Subcategory[];
  productsSubcategory: Product[];
  products: Product[];
  message: string | null;
  success: boolean | null;
}

export type CategoryAction =
  | {type: 'getAllCategories'; payload: Category[]}
  | {type: 'getSubcategories'; payload: Subcategory[]}
  | {type: 'getProductsSubcategory'; payload: Product[]}
  | {type: 'getProducts'; payload: Product[]}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'removeSuccess'};

export const CategoryReducer = (
  state: CategoryState,
  action: CategoryAction,
): CategoryState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        success: false,
      };

    case 'getAllCategories':
      return {
        ...state,
        errorMessage: '',
        categories: action.payload,
        success: false,
      };

    case 'getProducts':
      return {
        ...state,
        errorMessage: '',
        products: action.payload,
        success: false,
      };

    case 'getSubcategories':
      return {
        ...state,
        errorMessage: '',
        subcategories: action.payload,
        success: false,
      };

    case 'getProductsSubcategory':
      return {
        ...state,
        errorMessage: '',
        productsSubcategory: action.payload,
        success: false,
      };

    case 'removeSuccess':
      return {
        ...state,
        success: false,
      };
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    default:
      return state;
  }
};
