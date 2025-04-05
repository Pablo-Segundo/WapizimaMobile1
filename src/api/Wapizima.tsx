import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  const baseURL = 'http://192.168.1.27:3000/api';
//const baseURL = 'https://testapi.wapizima.com/api';
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
