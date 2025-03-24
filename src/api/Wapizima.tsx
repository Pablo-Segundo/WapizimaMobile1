import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://api.wapizima.com/api';

const API = axios.create({ baseURL });

API.interceptors.request.use(async config => {
  const currency = await AsyncStorage.getItem('currency');
  if (currency) {
    config.headers!.Currency = currency;
  }
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers!.Authorization = token;
  }
  return config;
});

export default API; 
