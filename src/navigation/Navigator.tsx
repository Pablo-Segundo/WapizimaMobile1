import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/Auth/AuthContext';
import {CartContext} from '../context/Cart/CartContext';
import VerifyPhoneNumberScreen from '../screens/verifyPhone/VerifyPhoneNumberScreen';
import VerifyCodeScreen from '../screens/verifyPhone/VerifyCodeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import {usePermissions} from '../hooks/usePermissions';
import SplashScreen from 'react-native-splash-screen';
import Drawers from './Drawers';
import {LoadingScreen} from '../screens/LoadingScreen';
import {MaintainmentScreen} from '../screens/Maintainment';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {SearchCart} from '../components/header/SearchCart';
import {LogLevel} from 'react-native-reanimated/lib/typescript/logger';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {ForgotPasswordScreen} from '../screens/auth/ForgotPasswordScreen';
import ProductScreen from '../screens/products/ProductScreen';

import { BrandScreen } from '../screens/BrandScreen';
import CategoryCard from '../components/CategoryCard';
import { CategoryScreen } from '../screens/CategoryScreen';


const Stack = createStackNavigator();

const Navigator = ({notify}: any) => {
  const navigation = useNavigation();
  const {status, maintainment} = useContext(AuthContext);
  const {loadCart} = useContext(CartContext);
  const {checkNotification} = usePermissions();
  
  console.log('====================================');
  console.log(status, 'status');
  console.log('====================================');
  useEffect(() => {
    // loadCart();
    checkNotification();
    SplashScreen.hide();
  }, []);

  if (status === 'checking') {
    return <LoadingScreen />;
  } else if (maintainment === true) {
    return <MaintainmentScreen />;
  }

  function Splash({navigation}: any) {
    if (notify) {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {name: 'Drawers'},
              {
                name: notify.data.route,
                params: {
                  id: notify.data.params,
                  name: notify.data.name,
                  subcategory_id: notify.data.subcategory_id,
                },
              },
            ],
          }),
        );
      }, 3000);

      return <LoadingScreen />;
    } else {
      setTimeout(() => {
        navigation.replace('Drawers');
      }, 3000);
      return <LoadingScreen />;
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {status === 'authwithoutphone' && (
        <>
          <Stack.Screen
            name="VerifyPhoneNumber"
            component={VerifyPhoneNumberScreen}
          />
          <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        </>
      )}

    
      {/* <Stack.Screen name="Home" component={WelcomeScreen} /> */}
      {/* {status === 'unauthorized' && (
        <>
         
          <Stack.Screen name="Splash" component={Splash} /> */}
           <Stack.Screen name="Drawers" component={Drawers} />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              title: 'Buscador',
              headerShown: true,
              animation: 'slide_from_bottom',
              animationTypeForReplace: 'push',
            }}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{
              headerShown: true,
            }}
          />
     
           <Stack.Screen
            name="Marca"
            component={BrandScreen}
            options={{
              headerShown: true,
              headerTransparent: false,
              headerRight: props => <SearchCart {...navigation} />,

            }}
          />
            <Stack.Screen
            name="Categoria"
            component={CategoryScreen}
            options={{
              headerShown: true,
              headerTransparent: false,
              headerRight: props => <SearchCart {...navigation} />,
            }}
          />

        {/* </>
      )} */}

      {status === 'authenticated' && (
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              title: 'Buscador',
              headerShown: true,
              animation: 'slide_from_bottom',
              animationTypeForReplace: 'push',
            }}
          />

          <Stack.Screen name="Drawers" component={Drawers} />
        </>
      )}

      {/* <Stack.Screen name="SearchCart" component={SearchCart} /> */}
    </Stack.Navigator>
  );
};

export default Navigator;
