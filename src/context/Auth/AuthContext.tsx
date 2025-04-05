import React, { createContext, useContext, useEffect, useReducer } from 'react';
import Wapizima from '../../api/Wapizima';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginData,
  MessageResponse,
  registerGoogleData,
  verifyCodeData,
  verifyCodeResponse,
  verifyNumberData,
  changePasswordData,
  ResetPasswordData,
  VerifyPhoneResponse,
  updateUserData,
  Direction,
  saveDirectionResponse,
  registerAppleData,
} from '../../interfaces/loginResponse';
import { AuthReducer, AuthState } from './AuthReducer';
import { Alert } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import {
  LoginResponse,
  RegisterData,
  RegisterResponse,
  UpdateImageResponse,
  User,
} from '../../interfaces/AuthInterface';
import { CartContext } from '../Cart/CartContext';
import { BillingAddress } from '../../interfaces/DirectionsInterface';


type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  code: string | null;
  data: string | null;
  message: string;
  phone_number: string | null;
  success: boolean | null;
  verified: boolean | null;
  profileImage: string | null;
  maintainable: boolean;
  status:
  | string
  | 'checking'
  | 'authenticated'
  | 'unauthorized'
  | 'authwithoutphone';
  wCart: string | 'whitCart' | 'withoutCart';
  signUp: (registerData: RegisterData) => void;
  changePassword: (changePasswordData: changePasswordData) => void;
  saveDirection: (saveDirection: Direction) => void;
  billingAddress: (billingAddress: BillingAddress) => void;
  updateInfo: (user: updateUserData) => void;
  updateBillingAddress: (bAddress: BillingAddress) => void;
  signUpGoogle: (registerGoogleData: registerGoogleData) => void;
  signUpApple: (registerAppleData: registerAppleData) => void;
  forgotPassword: (ResetPasswordData: ResetPasswordData) => void;
  signIn: (loginData: loginData) => void;
  verifyPhone: (verifyNumberData: verifyNumberData) => void;
  resendCode: () => void;
  updateImage: (image: any) => void;
  verifyCode: (verifyCodeData: verifyCodeData) => void;
  logOut: () => void;
  removeError: () => void;
  removeMessage: () => void;
  addError: (message: string) => void;
  removeSuccess: () => void;
  updateDirection: (direction: Direction, directionId: string) => void;
  removeCart: () => void;
  deletePhone: () => void;
  deleteAccount: ()=> void;
  getMaintainment: ()=> void;
};

const AuthInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  success: false,
  verified: false,
  wCart: 'withoutCart',
  errorMessage: '',
  code: null,
  data: null,
  message: '',
  phone_number: null,
  profileImage: null,
  maintainment: false,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthInitialState);
  const { removeId } = useContext(CartContext);
  useEffect(() => {
    validateToken();
    getMaintainment();
  }, []);

  const validateToken = async () => {
    console.log('(NOBRIDGE) LOG: Iniciando validación del token');
    const token = await AsyncStorage.getItem('token');
    console.log('(NOBRIDGE) LOG: Token obtenido', token);
  
    if (!token) {
      console.log('(NOBRIDGE) LOG: No hay token, usuario no autenticado');
      return dispatch({ type: 'notAuthenticated' });
    }
    try {
      const { data } = await Wapizima.get('/auth');
      console.log('(NOBRIDGE) LOG: Respuesta de /auth', data);
      
      await AsyncStorage.setItem('token', data.token);
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
          cart: false,
        },
      });
    } catch (error: any) {
      console.log('(NOBRIDGE) LOG: Error en /auth', error);
      dispatch({ type: 'notAuthenticated' });
      await AsyncStorage.removeItem('token');
    }
  };
  
  const getMaintainment = async () => {
    try {
      const { data } = await Wapizima.get('/administrable/maintainment');
      dispatch({
        type: 'getMaintainment',
        payload: {
          maintainment: data.maintainment,
        },
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message || 'En mantenimiento',
      });
    }
  };


  const signIn = async ({ email, password }: loginData) => {
    try {
      const { data } = await Wapizima.post<LoginResponse>('/auth/login-mobile', {
        email,
        password,
      }); 
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
          cart: data.cart,

        },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message || 'Correo o contraseña incorrectos',
      });
    }
  };

  const signUp = async ({ email, password, fullname }: RegisterData) => {
    try {
      const { data } = await Wapizima.post<RegisterResponse>('/auth/register', {
        email,
        password,
        fullname,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
          cart: false,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Error al intentar registrarse',
      });
    }
  };

  const signUpGoogle = async ({ idToken }: registerGoogleData) => {
    try {
      const { data } = await Wapizima.post<LoginResponse>('/auth/login-google', {
        idToken,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
          cart: false,
        },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'El inicio se sesión por google no se ha podido completar',
      });
    }
  };
  const signUpApple = async ({ idToken, nonce, fullName }: registerAppleData) => {
    try {
      const { data } = await Wapizima.post('/auth/login-apple', {
        idToken: idToken,
        nonce: nonce,
        fullName: fullName,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
          cart: false,
        },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'El inicio se sesión por Apple no se ha podido completar',
      });
    }
  };

  const forgotPassword = async ({ email }: ResetPasswordData) => {
    try {
      await Wapizima.post<MessageResponse>('/auth/forgot-password', {
        email,
      });

      Alert.alert(
        'Correo Enviado',
        'Se ha enviado el correo de reestablecimiento de contraseña',
        [{ text: 'OK' }],
      );
      dispatch({
        type: 'changePassword',
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'El inicio se sesión por google no se ha podido completar',
      });
    }
  };

  const changePassword = async ({
    actual_password,
    new_password,
    confirm_new_password,
  }: changePasswordData) => {
    try {
      await Wapizima.post<User>('/auth/changePassword', {
        actual_password,
        new_password,
        confirm_new_password,
      });

      dispatch({
        type: 'changePassword',
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Error al actualizar',
      });
    }
  };

  const updateImage = async (img: ImagePickerResponse) => {
    try {
      const fileToUpload = {
        uri: img.uri,
        type: img.type,
        name: img.fileName,
      };
      const formData = new FormData();
      formData.append('profileImage', fileToUpload);
      const { data } = await Wapizima.put<UpdateImageResponse>(
        '/auth/update-profile-image',
        formData,
      );
      dispatch({
        type: 'updateImage',
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateInfo = async (data: updateUserData) => {
    const { fullname, phone_number } = data;
    try {
      const { data } = await Wapizima.put('/auth/update-user-info', {
        fullname,
        phone_number,
        prefix: 52
      });
      dispatch({
        type: 'updateInfo',
        payload: {
          user: data.user,
          message: data.message,
        },
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Error al actualizar',
      });
    }

  };

  const verifyPhone = async ({ phone_number, prefix }: verifyNumberData) => {
    try {
      const { data } = await Wapizima.post<VerifyPhoneResponse>(
        '/auth/send-code',
        {
          phone_number,
          prefix,
        },
      );
      dispatch({
        type: 'verifyPhone',
        payload: {
          phone_number: data.phone_number,
          code: data.code,
        },
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Introduce un teléfono válido',
      });
    }
  };

  const resendCode = async () => {
    try {
      const { data } = await Wapizima.post<VerifyPhoneResponse>(
        '/verifynumber/resend-code',
      );
      await AsyncStorage.removeItem('token');
      await AsyncStorage.setItem('token', data.token);
      dispatch({
        type: 'verifyPhone',
        payload: {
          phone_number: data.phone_number,
          code: data.code,
        },
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Introduce un teléfono válido',
      });
    }
  };

  const verifyCode = async (code: verifyCodeData) => {
    try {
      const { data } = await Wapizima.post<verifyCodeResponse>(
        '/auth/verify-code',
        {
          code,
        },
      );
      dispatch({
        type: 'verifyCode',
        payload: {
          data: data.data,
        },
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Introduce un código válido',
      });
    }
  };

  const deletePhone = async () => {
    try {
      await  Wapizima.delete(`/auth/delete-phoneNumber`);
     
    } catch (error: any) {
      Alert.alert('Error', 'Al cancelar');
    }
  };
  const deleteAccount = async () => {
    try {
      await  Wapizima.delete(`/clients`);
     
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo cancelar la orden');
    }
  };

  const logOut = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser != null) {
      try {
        await GoogleSignin.signOut();
      } catch (error) {
        console.error(error);
      }
    }
    await AsyncStorage.removeItem('token');
    dispatch({
      type: 'logout',
    });
    removeId();
  };

  const removeError = () => {
    dispatch({
      type: 'removeError',
    });
  };

  const removeCart = () => {
    dispatch({
      type: 'removeCart',
    });
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

  const removeMessage = () => {
    dispatch({
      type: 'removeMessage',
    });
  };

  const saveDirection = async (direction: Direction) => {
    try {
      await Wapizima.post<saveDirectionResponse>(
        '/auth/save-directions',
        direction,
      );
      dispatch({
        type: 'addMessage',
        payload: 'Dirección guardada',
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Error al guardar',
      });
    }
  };

  const billingAddress = async (bAddress: BillingAddress) => {
    const { legal_name, email, tax_id, phone, tax_system, address } = bAddress;
    try {
      await Wapizima.post('/auth/save-sat-direction', {
        legal_name,
        email,
        tax_id,
        phone,
        tax_system,
        address,
      });
      dispatch({
        type: 'addMessage',
        payload: 'Dirección guardada',
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Error al guardar',
      });
    }
  };

  const updateDirection = async (direction: Direction, directionId: string) => {
    try {
      await Wapizima.put<saveDirectionResponse>(
        `/auth/update-directions/${directionId}`,
        direction,
      );
      dispatch({
        type: 'addMessage',
        payload: 'Dirección actualizada',
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Error al actualizar',
      });
    }
  };

  const updateBillingAddress = async (
    bAddress: BillingAddress,
  ) => {
    const { legal_name, email, tax_id, phone, tax_system, address } = bAddress;
    try {
      await Wapizima.put(`/auth/update-sat-direction/`, {
        legal_name,
        email,
        tax_id,
        phone,
        tax_system,
        address,
      });
      dispatch({
        type: 'addMessage',
        payload: 'Dirección actualizada',
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.message || 'Error al actualizar',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        verifyPhone,
        saveDirection,
        logOut,
        addError,
        resendCode,
        verifyCode,
        removeError,
        removeMessage,
        signUpGoogle,
        changePassword,
        updateInfo,
        updateImage,
        removeSuccess,
        forgotPassword,
        updateBillingAddress,
        updateDirection,
        removeCart,
        billingAddress,
        deletePhone,
        deleteAccount,
        getMaintainment,
        signUpApple,
        ...state,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
