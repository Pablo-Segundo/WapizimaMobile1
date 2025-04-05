import React, {useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/Auth/AuthContext';

const DrawerStyle = props => {
  const {user, logOut} = useContext(AuthContext);
  const navigation = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animatePress = callback => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => callback?.());
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
     
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              user?.photoURL ||
              'https://www.oeh-salzburg.at/wp-content/uploads/blank-profile-picture-973460_640.png',
          }}
        />

        <Text style={styles.userName}>{user?.name || 'Invitado'}</Text>

        {!user ? (
          <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <TouchableOpacity
              onPress={() =>
                animatePress(() => props.navigation.navigate('LoginScreen'))
              }
              style={styles.loginButton}
              activeOpacity={0.8}>
              <Ionicons name="log-in-outline" size={24} color={'white'} />
              <Text style={styles.loginButtonText}>Inicia sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Text style={styles.userEmail}>{user?.email}</Text>
        )}
      </View>

      {/* Separador decorativo */}
      <View style={styles.divider} />

      <DrawerItemList
        {...props}
        itemStyle={styles.menuItem}
        labelStyle={styles.menuLabel}
      />

      <View style={styles.divider} />

      <View style={styles.actionsContainer}>
        {!user ? (
          <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <TouchableOpacity
              onPress={() =>
                animatePress(() => navigation.navigate('RegisterScreen'))
              }
              style={styles.registerButton}
              activeOpacity={0.8}>
              <Ionicons name="person-add-outline" size={24} color={'#E3087E'} />
              <Text style={styles.registerButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <TouchableOpacity
              onPress={() => animatePress(logOut)}
              style={styles.logoutButton}
              activeOpacity={0.8}>
              <Ionicons name="log-out-outline" size={24} color={'#E3087E'} />
              <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/* Footer con información legal */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://wapizima.com/politicas-de-privacidad')
          }
          activeOpacity={0.7}>
          <Text style={styles.footerLink}>Políticas de Privacidad</Text>
        </TouchableOpacity>

        <Text style={styles.copyright}>
          © Copyright 2025 By Digital Pineapple
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 25,
    paddingBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 3,
    borderColor: '#E3087E',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3087E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    elevation: 2,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  divider: {
    height: 3,

    backgroundColor: 'gray',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  menuItem: {
   
    marginHorizontal: 10,
    marginVertical: 2,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: -15,
  },
  actionsContainer: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3087E',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(227, 8, 126, 0.1)',
  },
  registerButtonText: {
    color: '#E3087E',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#E3087E',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 3,
    borderTopColor: '#f0f0f0',
    paddingTop: 20,
    marginTop: 25,
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 17,
    color: '#E3087E',
    fontWeight: '500',
    marginBottom: 18,
  },
  copyright: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default DrawerStyle;
