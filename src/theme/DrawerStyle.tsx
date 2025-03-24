import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../context/Auth/AuthContext';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const DrawerStyle = (props: any) => {
  const {user, logOut} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{backgroundColor: 'white'}}>
      {/* Imagen de perfil */}
      <View style={{alignItems: 'center', padding: 20}}>
        <Image
          style={{
            width: 110,
            height: 110,
            resizeMode: 'cover',
            borderRadius: 100,
            backgroundColor: 'white',
          }}
          source={{
            uri: 'https://www.oeh-salzburg.at/wp-content/uploads/blank-profile-picture-973460_640.png',
          }}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('LoginScreen')}
          style={{marginTop: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="log-in-outline" size={30} color={'black'} />
            <Text style={{marginLeft: 8, fontSize: 18, color: 'black'}}>
              Inicia sesión
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
          {user?.name || 'Invitado'}
        </Text>
      </View>

      {/* Opciones del Drawer */}
      <DrawerItemList {...props} />

      {/* Botón para cerrar sesión */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          padding: 10,
          backgroundColor: '#E3087E',
          borderRadius: 5,
          justifyContent: 'center',
          marginHorizontal: 20,
        }}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Ionicons
          name="log-in-outline"
          size={30}
          color={'white'}
          style={{marginRight: 8}}
        />
        <Text style={{color: 'white', fontSize: 16}}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          borderColor: '#E3087E',
          borderWidth: 1,
          padding: 10,
          // backgroundColor: '#E3087E',
          borderRadius: 5,
          justifyContent: 'center',
          marginHorizontal: 20,
        }}
        onPress={logOut}>
        <Ionicons
          name="person-add-outline"
          size={30}
          color={'#E3087E'}
          style={{marginLeft: 8}}
        />
        <Text style={{color: '#E3087E', fontSize: 16}}> Registrarse</Text>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          marginBottom: 36,
          marginTop: 35,
          backgroundColor: '#E3087E',
          flexDirection: 'column',
          alignItems: 'center',

          justifyContent: 'center',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://wapizima.com/politicas-de-privacidad')
          }>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
              marginTop: 8,
            }}>
            Políticas de Privacidad
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
            marginVertical: 8,
            textAlign: 'center',
          }}>
          © Copyright 2025 By Digital Pineapple
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerStyle;
