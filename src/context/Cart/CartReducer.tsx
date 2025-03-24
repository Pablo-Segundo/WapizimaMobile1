import { ProductCart } from '../../interfaces/CartInterface';

export interface CartState {
  cart: ProductCart[];
  errorMessage: string;
  success: boolean;
  id: string;
}

export type CartAction =
  | {
    type: 'addToCart';
    payload: { cart: ProductCart[]; id: string };
  }
  | {
    type: 'removeFromCart';
    payload: ProductCart[];
  }
  | {
    type: 'clearCart';
  }
  | {
    type: 'addError';
    payload: string;
  }
  | {
    type: 'removeError';
  }
  | {
    type: 'loadCart';
    payload: ProductCart[];
  }
  | {
    type: 'removeId';
  };
;

export const CartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case 'addToCart':
      return {
        ...state,
        cart: action.payload.cart,
        id: action.payload.id,
        errorMessage: '',
        success: false,
      };

    case 'removeFromCart':
      return {
        ...state,
        cart: action.payload,
        errorMessage: '',
        success: false,
      };

    case 'clearCart':
      return {
        ...state,
        cart: [],
        errorMessage: '',
        success: false,
      };

    case 'loadCart':
      return {
        ...state,
        cart: action.payload,
        errorMessage: '',
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

    case 'removeId':
      return {
        ...state,
        id: '',
      };

    default:
      return state;
  }
};
