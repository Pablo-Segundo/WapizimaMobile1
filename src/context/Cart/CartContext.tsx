import React, { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AddCartResponse, CartResponse, LoadCartData, Product, ProductCart } from '../../interfaces/CartInterface';
import { CartReducer, CartState } from './CartReducer';
import { AuthContext } from '../Auth/AuthContext';
import API from '../../api/Wapizima';

type CartContextProps = {
  errorMessage: string;
  success: boolean;
  cart: ProductCart[];
  id: string;
  addError: (message: string) => void;
  removeError: () => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: (cardId?: string) => void;
  loadCart: () => void;
  getCart: () => void;
  saveCart: () => void;
  removeId: () => void;
};

const CartInitialState: CartState = {
  errorMessage: '',
  success: false,
  cart: [],
  id: '',
};

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, CartInitialState);

  const { status } = useContext(AuthContext);
  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (product: Product, quantity: number) => {
    try {
      if (!quantity) quantity = 1;

      if (status === 'authenticated') {
        const { data } = await API.post<AddCartResponse>('/cart',{
          product_id: product._id,
          quantity,
        });
        dispatch({
          type: 'addToCart',
          payload: {
            cart: data.cart.products,
            id: data.cart._id,
          },
        });
      }
      else {
        const cartArray = await AsyncStorage.getItem('cart');
        let cart: ProductCart[] = [];

        const cartItem: ProductCart = {
          product_id: product,
          quantity,
          _id: ''
        };

        if (cartArray) {
          cart = JSON.parse(cartArray);
          const productExists = cart.find(
            (item: ProductCart) => item.product_id._id === product._id,
          );

          if (productExists) {
            const index = cart.findIndex(
              (item: ProductCart) => item.product_id._id === product._id,
            );
            cart[index].quantity = quantity;
          }
          else {
            cart.push(cartItem);
          }
        } else{
          cart.push(cartItem);

        }
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
          type: 'addToCart',
          payload: {
            cart,
            id: '',
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.message, 'errorrrrr');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (status === 'authenticated') {
        await API.delete(`/cart/product/${productId}`);
        const newCart = state.cart.filter(
          (item: ProductCart) => item.product_id._id !== productId,
        );
        dispatch({
          type: 'removeFromCart',
          payload: newCart,
        });
      }
      else {
        const cartArray = await AsyncStorage.getItem('cart');
        let cart: ProductCart[] = [];

        if (cartArray) {
          cart = JSON.parse(cartArray);
          const index = cart.findIndex(
            (item: ProductCart) => item.product_id._id === productId,
          );
          cart.splice(index, 1);
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
          type: 'removeFromCart',
          payload: cart,
        });
      }

    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const clearCart = async (cardId?: string) => {
    try {
      if (status === 'authenticated') await API.delete(`/cart/${cardId}`)
      else await AsyncStorage.removeItem('cart');
      dispatch({
        type: 'clearCart',
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: 'clearCart',
      });
    }
  };

  const addError = (message: string) => {
    dispatch({
      type: 'addError',
      payload: message,
    });
  };

  const removeError = () => {
    dispatch({
      type: 'removeError',
    });
  };

  const loadCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
        dispatch({
          type: 'loadCart',
          payload: JSON.parse(cart),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    try {
      const { data } = await API.get<CartResponse>('/cart');

      dispatch({
        type: 'addToCart',
        payload: {
          cart: data.cart.products,
          id: data.cart._id,
        },
      });
      await AsyncStorage.removeItem('cart');
    } catch (error) {
      console.log(error);
    }
  };

  const saveCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');

      const products = JSON.parse(cart!).map((item: ProductCart) => {
        return {
          product_id: item.product_id._id,
          quantity: item.quantity,
        };
      });

      const { data } = await API.post('/cart/products', {
        products,
      });
      getCart();
    } catch (error) {
      console.log(error);
    }
  }

  const removeId = async () => {
    dispatch({
      type: 'removeId',
    });
  };

  return (
    <CartContext.Provider
      value={{
        addError,
        removeError,
        addToCart,
        removeFromCart,
        clearCart,
        loadCart,
        getCart,
        saveCart,
        removeId,
        ...state,
      }}>
      {children}
    </CartContext.Provider>
  );
};
