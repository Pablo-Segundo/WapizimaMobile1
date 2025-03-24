import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../context/Auth/AuthContext';
import {useForm} from '../../hooks/useForm';
import {GoogleSigninFunction} from '../../components/Google/GoogleSignInFunction';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {

  const navigation = useNavigation();
  const { signUp, errorMessage, removeError } = useContext(AuthContext);
  const { email, password, fullname, onChange } = useForm({
    fullname: '',
    email: '',
    password: '',
  });
  const [hidePassword, setHidePassword] = useState(true);

  const onRegister = () => {
    Keyboard.dismiss();
    if (!fullname || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    signUp({fullname, email, password});
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/image/logo.png')}
        style={styles.logo}
        alt="Ecommerce"
      />

      <Text style={styles.title}>Registrarse</Text>

      <View style={styles.formContainer}>
        <Text style={{color: 'gray', fontSize: 16}}>Crea una cuenta</Text>

        <View style={styles.inputContainer}>
          <Icon
            name="account-outline"
            size={24}
            color="#E3087E"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={fullname}
            onChangeText={value => onChange(value, 'fullname')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="email-outline"
            size={24}
            color="#E3087E"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={value => onChange(value, 'email')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="lock-outline"
            size={24}
            color="#E3087E"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={value => onChange(value, 'password')}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#666"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity  onPress={() => { onRegister()}} style={styles.button}>
          <Text style={styles.buttonText2}>Registrate</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>¿Ya tienes cuenta?</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Inicia sesíon</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20}}></View>
        <GoogleSigninFunction />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    elevation: 3,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#E3087E',
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText2: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  //--
  button: {
    backgroundColor: '#E3087E',
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,

    borderColor: '#E3087E',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E3087E',
  },
  buttonText: {
    color: '#E3087E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});

export default RegisterScreen;
