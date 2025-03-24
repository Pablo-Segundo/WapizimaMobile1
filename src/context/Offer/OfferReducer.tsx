import { BusinessRule } from '../../interfaces/BusinessRules';
import { Currency } from '../../interfaces/CurrencyInterface';
import {Offer} from '../../interfaces/OfferInterfaces';

export interface OfferState {
  errorMessage: string;
  offer: Offer | null;
  offers: Offer[];
  currency: Currency | null;
  currencies: Currency[];
  message: string | null;
  success: boolean | null;
  businessRule: BusinessRule[];
  currencyLocal: string | null;
}

export type OfferAction =
  | {type: 'getAllOffers'; payload: Offer[]}
  | {type: 'getBusinessRules'; payload: BusinessRule[]}
  | {type: 'getAllCurrencies'; payload: Currency[]}
  | {type: 'localCurrency'; payload: string}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'removeSuccess'};

export const OfferReducer = (
  state: OfferState,
  action: OfferAction,
): OfferState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        success: false,
      };

    case 'getAllOffers':
      return {
        ...state,
        errorMessage: '',
        offers: action.payload,
        success: false,
      };
      case 'getBusinessRules':
      return {
        ...state,
        errorMessage: '',
        businessRule: action.payload,
        success: false,
      };
      case 'getAllCurrencies':
      return {
        ...state,
        errorMessage: '',
        currencies: action.payload,
        success: false,
      };
      case 'localCurrency':
        return {
          ...state,
          errorMessage: '',
          currencyLocal: action.payload,
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
        success: false,
      };

    default:
      return state;
  }
};
