import React, { createContext, useReducer } from 'react';

import {
  Category,
  CategoriesResponse,
  ProductsResponse,
} from '../../interfaces/CategoryInterfaces';
import {
  SubcategoriesResponse,
  Subcategory,
} from '../../interfaces/SubcategoryInterface';

import { CategoryReducer, CategoryState } from './CategoryReducer';
import { Product } from '../../interfaces/ProductInterfaces';
import Wapizima from '../../api/Wapizima';

type CategoryContextProps = {
  errorMessage: string;
  category: Category | null;
  categories: Category[];
  subcategories: Subcategory[];
  productsSubcategory: Product[];
  products: Product[];
  message: string | null;
  success: boolean | null;
  getCategories: () => void;
  getProducts: (categoryId: string) => void;
  getProductsSubcategory: (subcategoryId: string) => void;
  getSubcategories: (categoryId: string) => void;
  removeError: () => void;
  addError: (message: string) => void;
  removeSuccess: () => void;
};

const CategoryInitialState: CategoryState = {
  category: null,
  categories: [],
  productsSubcategory: [],
  subcategories: [],
  products: [],
  message: null,
  success: false,
  errorMessage: '',
};

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CategoryReducer, CategoryInitialState);

  const getCategories = async () => {
    try {
      const { data } = await Wapizima.get<CategoriesResponse>('/categories');
      const categories = data.categories.filter(
        (category: Category) => category.totalProducts > 0,
      );
      dispatch({
        type: 'getAllCategories',
        payload: categories,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ninguna categoria disponible',
      });
    }
  };

  const getProducts = async (categoryId: string) => {
    try {
      const { data } = await Wapizima.get<ProductsResponse>(
        '/products/category/' + categoryId,
      );
      dispatch({
        type: 'getProducts',
        payload: data.products,
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

  const getSubcategories = async (categoryId: string) => {
    try {
      const { data } = await Wapizima.get<SubcategoriesResponse>(
        '/categories/' + categoryId,
      );
      dispatch({
        type: 'getSubcategories',
        payload: data.subcategories,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ninguna subcategoria disponible',
      });
    }
  };

  const getProductsSubcategory = async (subcategoryId: string) => {
    try {
      const { data } = await Wapizima.get<ProductsResponse>(
        '/products/subcategory/' + subcategoryId,
      );
      dispatch({
        type: 'getProductsSubcategory',
        payload: data.products,
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

  const addError = (message: string) => {
    dispatch({
      type: 'addError',
      payload: message,
    });
  };

  const removeSuccess = () => {
    dispatch({
      type: 'removeSuccess',
    });
  };

  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  return (
    <CategoryContext.Provider
      value={{
        getCategories,
        getProducts,
        getProductsSubcategory,
        getSubcategories,
        addError,
        removeSuccess,
        removeError,
        ...state,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};
