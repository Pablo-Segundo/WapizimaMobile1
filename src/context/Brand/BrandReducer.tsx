import {Brand, Category, Subcategory} from '../../interfaces/BrandInterface';

export interface BrandState {
  errorMessage: string;
  brand: Brand | null;
  success: boolean;
  brands: Brand[];
  categories: Category[];
  subcategories: Subcategory[];
}

export type BrandAction =
  | {type: 'getAllBrands'; payload: Brand[]}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'getCategoryByBrand'; payload: Category[]}
  | {type: 'getProductsBySubcategory'; payload: Subcategory[]};

export const BrandReducer = (
  state: BrandState,
  action: BrandAction,
): BrandState => {
  switch (action.type) {
    case 'getAllBrands':
      return {
        ...state,
        errorMessage: '',
        brands: action.payload,
        success: false,
      };

    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        success: false,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
        success: false,
      };

    case 'getCategoryByBrand':
      return {
        ...state,
        errorMessage: '',
        categories: action.payload,
        success: false,
      };

    case 'getProductsBySubcategory':
      return {
        ...state,
        errorMessage: '',
        subcategories: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
