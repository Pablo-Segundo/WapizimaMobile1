import React, { createContext, useReducer } from 'react';
import Wapizima from '../../api/Wapizima';
import { Currency, CurrencyResponse } from '../../interfaces/CurrencyInterface';
import { Offer, OffersResponse } from '../../interfaces/OfferInterfaces';
import { OfferReducer, OfferState } from './OfferReducer';
import { BusinesRule, BusinessRule } from '../../interfaces/BusinessRules';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OfferContextProps = {
  errorMessage: string;
  offer: Offer | null;
  offers: Offer[];
  businessRule: BusinessRule[];
  currency: Currency | null;
  currencyLocal: string | null;
  currencies: Currency[];
  message: string | null;
  success: boolean | null;
  getOffers: () => void;
  localCurrency: (currencie: string| null) => void;
  getBusinessRules: () => void;
  getCurrencies: () => void;
  removeError: () => void;
  addError: (message: string) => void;
  removeSuccess: () => void;
};

const OfferInitialState: OfferState = {
  offer: null,
  offers: [],
  message: null,
  success: false,
  errorMessage: '',
  currencies: [],
  currency: null,
  businessRule: [],
  currencyLocal: null,
};

export const OfferContext = createContext({} as OfferContextProps);

export const OfferProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(OfferReducer, OfferInitialState);

  const getOffers = async () => {
    try {
      const response = await Wapizima.get<OffersResponse>('/offers');
      dispatch({
        type: 'getAllOffers',
        payload: response.data.offers,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ninguna oferta disponible',
      });
    }
  };
  const getBusinessRules = async () => {
    try {
      const { data } = await Wapizima.get<BusinesRule>('/business-rules');
      dispatch({
        type: 'getBusinessRules',
        payload: data.business_rules
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ninguna oferta disponible',
      });
    }
  };
  const getCurrencies = async () => {
    try {
      const { data } = await Wapizima.get<CurrencyResponse>('/currencies');
      data.currencies.map((item: Currency) => {
        item.label = item.currency;
        return item;
      });
      dispatch({
        type: 'getAllCurrencies',
        payload: data.currencies,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ninguna currencie',
      });
    }
  };

  const localCurrency = async (currencie: string ) => {

    try {
      await AsyncStorage.setItem('currency', currencie);
      
      dispatch({
        type: 'localCurrency',
        payload: currencie
      });
    } catch (e) {
      console.log(e);


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
    dispatch({
      type: 'removeError',
    });
  };

  return (
    <OfferContext.Provider
      value={{
        getOffers,
        addError,
        removeSuccess,
        removeError,
        getCurrencies,
        getBusinessRules,
        localCurrency,
        ...state,
      }}>
      {children}
    </OfferContext.Provider>
  );
};
