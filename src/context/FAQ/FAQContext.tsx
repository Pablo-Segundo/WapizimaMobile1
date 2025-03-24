import React, {createContext, useReducer} from 'react';
import Wapizima from '../../api/Wapizima';
import {
  faq,
  faqCategory,
  AllFAQsResponse,
  AllFAQCategoriesResponse,
} from '../../interfaces/FAQInterfaces';
import {FAQReducer} from './FAQReducer';

type FAQContextProps = {
  errorMessage: string;
  faq: faq | null;
  faqCategory: faqCategory | null;
  faqs: AllFAQsResponse | null;
  faqCategories: AllFAQCategoriesResponse | null;
  message: string | null;
  success: boolean | null;
  getFAQs: () => void;
  getCategoryFAQs: () => void;
  removeError: () => void;
  addError: (message: string) => void;
  removeSuccess: () => void;
};

const FAQInitialState: FAQState = {
  faq: null,
  faqs: [],
  faqCategories: [],
  faqCategory: null,
  message: null,
  success: false,
  errorMessage: '',
};

export const FAQContext = createContext({} as FAQContextProps);

export const FAQProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(FAQReducer, FAQInitialState);

  const getCategoryFAQs = async () => {
    try {
      const response = await Wapizima.get<AllFAQCategoriesResponse>(
        '/faq-category',
      );
      dispatch({
        type: 'getCategoryFAQs',
        payload: response.data.faqCategory,
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

  const getFAQs = async (_id: any) => {
    try {
      const response = await Wapizima.get<AllFAQsResponse>(
        `/faq/category/${_id}/`,
      );
      dispatch({
        type: 'getFAQs',
        payload: response.data.faqs,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ninguna pregunta disponible',
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

  return (
    <FAQContext.Provider
      value={{
        getCategoryFAQs,
        getFAQs,
        addError,
        removeSuccess,
        ...state,
      }}>
      {children}
    </FAQContext.Provider>
  );
};
