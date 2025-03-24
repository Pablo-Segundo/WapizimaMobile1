import React, { createContext, useReducer } from 'react';
import {
  BrandsResponse,
  Brand,
  Category,
  Subcategory,
  CategoriesResponse,
  SubcategoriesResponse,
} from '../../interfaces/BrandInterface';
import { BrandReducer, BrandState } from './BrandReducer';

import Wapizima from '../../api/Wapizima';

type BrandContextProps = {
  errorMessage: string;
  brand: Brand | null;
  brands: Brand[];
  success: boolean;
  categories: Category[];
  subcategories: Subcategory[];
  getBrands: () => void;
  getCategoryByBrand: (barndId: string) => void;
  getProductsBySubcategory: (brandId: string, categoryId: string) => void;
  removeError: () => void;
  addError: (message: string) => void;
};

const BrandInitialState: BrandState = {
  brand: null,
  brands: [],
  categories: [],
  subcategories: [],
  success: false,
  errorMessage: '',
};

export const BrandContext = createContext({} as BrandContextProps);

export const BrandProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(BrandReducer, BrandInitialState);

  const getBrands = async () => {
    try {
      const { data } = await Wapizima.get<BrandsResponse>('/brands');
      dispatch({
        type: 'getAllBrands',
        payload: data.brands,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ninguna marca disponible',
      });
    }
  };

  const getCategoryByBrand = async (
    brandId: string
  ) => {
    try {
      const { data } = await Wapizima.get<CategoriesResponse>(
        `/categories/brand/${brandId}?`,
      );
      dispatch({
        type: 'getCategoryByBrand',
        payload: data.categories,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ningun producto disponible',
      });
    }
  };

  const getProductsBySubcategory = async (
    brandId: string,
    categoryId: string,
  ) => {
    try {
      const { data } = await Wapizima.get<SubcategoriesResponse>(
        `/products/brand/category/${brandId}/${categoryId}`,
      );
      dispatch({
        type: 'getProductsBySubcategory',
        payload: data.subcategories,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ningun producto disponible',
      });
    }
  };

  const removeError = () => {
    dispatch({
      type: 'removeError',
    });
  };

  const addError = (message: string) => {
    dispatch({
      type: 'addError',
      payload: message,
    });
  };

  return (
    <BrandContext.Provider
      value={{
        getBrands,
        getProductsBySubcategory,
        getCategoryByBrand,
        removeError,
        addError,
        ...state,
      }}>
      {children}
    </BrandContext.Provider>
  );
};
