import { User } from '../../interfaces/AuthInterface';

export interface AuthState {
  status:
  | string
  | 'checking'
  | 'authenticated'
  | 'unauthorized'
  | 'authwithoutphone';
  token: string | null;
  user: User | null;
  wCart: string | 'whitCart' | 'withoutCart';
  code: string | null;
  data: string | null;
  message: string;
  phone_number: string | null;
  errorMessage: string;
  success: boolean | null;
  verified: boolean | null;
  profileImage: string | null;
  maintainment: boolean
}

export type AuthAction =
  | {
    type: 'signUp';
    payload: { token: string; user: User; cart: boolean };
  }
  | { type: 'verifyPhone'; payload: { code: string; phone_number: string } }
  | { type: 'verifyCode'; payload: { data: string } }
  | { type: 'updateInfo'; payload: { user: User; message: string } }
  | { type: 'updateImage'; payload: { profileImage: string; message: string } }
  | { type: 'addError'; payload: string }
  | { type: 'saveDirection'; payload: { message: string } }
  | { type: 'addMessage'; payload: string }
  | { type: 'changePassword' }
  | { type: 'removeError' }
  | { type: 'removeMessage' }
  | { type: 'notAuthenticated' }
  | { type: 'logout' }
  | { type: 'removeSuccess' }
  | { type: 'removeCart' }
  | { type: 'getMaintainment', payload: {maintainment: boolean} }
  ;

export const AuthReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        token: null,
        user: null,
        errorMessage: action.payload,
        verified: false,
        success: false,
      };

    case 'addMessage':
      return {
        ...state,
        message: action.payload,
        success: true,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
        verified: false,
        success: false,
      };

    case 'removeSuccess':
      return {
        ...state,
        success: false,
      };

    case 'signUp':
      var status = 'unauthorized';
      let cart = 'withoutCart';
      if (action.payload.user.phone.verified === false) {
        status = 'authwithoutphone';
      } else {
        status = 'authenticated';
      }
      if (action.payload.cart === true) {
        cart = 'withCart';
      }
      return {
        ...state,
        errorMessage: '',
        status: status,
        wCart: cart,
        token: action.payload.token,
        user: action.payload.user,
        profileImage: action.payload.user.profileImage,
        verified: false,
        success: false,
      };
    case 'changePassword':
      return {
        ...state,
        success: true,
        errorMessage: '',
        message: '',
      };
    case 'getMaintainment':
      return {
        ...state,
        maintainment: action.payload.maintainment,
        errorMessage: '',
      };

    case 'updateInfo':
      return {
        ...state,
        success: true,
        user: action.payload.user,
        errorMessage: '',
      };

    case 'updateImage':
      return {
        ...state,
        success: true,
        profileImage: action.payload.profileImage,
        errorMessage: '',
      };

    case 'verifyPhone':
      return {
        ...state,
        errorMessage: '',
        phone_number: action.payload.phone_number,
        code: action.payload.code,
        verified: true,
        success: false,
      };

    case 'verifyCode':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        data: action.payload.data,
        success: true,
        verified: false,
      };

    case 'removeMessage':
      return {
        ...state,
        message: '',
      };

    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'unauthorized',
        token: null,
        user: null,
        verified: false,
        success: false,
      };

    case 'removeCart':
      return {
        ...state,
        wCart: 'withoutCart',
      };

    default:
      return state;
  }
};
