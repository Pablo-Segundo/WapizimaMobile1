import {View, Text, Image, Platform} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryStack from './stacks/CategoryStack';
import BrandStack from './stacks/BrandStack';
import CartStack from './stacks/CartStack';

import ContactScreen from '../screens/aboutUs/ContactScreen';
import { DistributorScreen } from '../screens/aboutUs/DistributorScreen';
import DrawerStyle from '../theme/DrawerStyle';
import CategoryCard from '../components/CategoryCard';
import { CategoriesScreen } from '../screens/categories/CategoriesScreen';

const Drawer = createDrawerNavigator();

const Drawers = () => {
  function LogoTitle() {
    return (
      <Image
        style={{
          marginTop: -10,
          width: widthPercentageToDP('30%'),
          height: heightPercentageToDP('8%'),
        }}
        source={require('../assets/image/logocompleto.png')}
      />
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#E3087E',
        drawerType: 'slide',
        overlayColor: 'trasparent',
        drawerActiveBackgroundColor: '#E3087E',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: 'black',
        drawerLabelStyle: {
          fontSize: 17,
        },
      }}
      drawerContent={props => <DrawerStyle {...props} />}
      >
      <Drawer.Screen
        name="Home"
        options={{
          headerShown: false,
          title: 'Inicio',
          headerStyle: {
            height:
              Platform.OS === 'ios'
                ? heightPercentageToDP('13%')
                : heightPercentageToDP('8%'),
          },
          headerTitle: props => {
            return <LogoTitle {...props} />;
          },
          drawerIcon: ({color}) => {
            return <Ionicons name="home-outline" size={30} color={color} />;
          },
          headerTitleAlign: 'center',
        }}
        component={WelcomeScreen}
      />

      <Drawer.Screen
        name="Categorías"
        component={CategoriesScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => {
            return <Ionicons name="layers-outline" size={30} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Marcas "
        component={BrandStack}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => {
            return <Ionicons name="ribbon-outline" size={30} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Cart "
        component={CartStack}
        options={{
          title: 'Carrito',
          headerShown: false,
          drawerIcon: ({color}) => {
            return <Ionicons name="cart-outline" size={30} color={color} />;
          },
        }}
      />

  <Drawer.Screen
              name="Distributor "
              component={DistributorScreen}
              options={{
                title: 'Distribuidor',
                headerShown: true,
                drawerIcon: ({ color }) => {
                  return <Ionicons name="business" size={30} color={color} />;
                },
              }}
            />
             <Drawer.Screen
              name="Contacto "
              component={ContactScreen}
              options={{
                title: 'Contactanos',
                headerShown: true,
                drawerIcon: ({ color }) => {
                  return <Ionicons name="call" size={30} color={color} />;
                },
              }}
            />

    </Drawer.Navigator>
  );
};

export default Drawers;
