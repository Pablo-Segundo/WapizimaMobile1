import React, {useContext, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  extendTheme,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  NativeBaseProvider,
  ScrollView,
  Text,
} from 'native-base';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StatusBar,
} from 'react-native';
import {AuthContext} from '../../context/Auth/AuthContext';
import {useForm} from '../../hooks/useForm';

interface Props extends NativeStackScreenProps<any, any> {}

export const ForgotPasswordScreen = ({navigation}: Props) => {
  const {forgotPassword, errorMessage, removeError, success} =
    useContext(AuthContext);
  const {email, onChange} = useForm({
    email: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert('Inicio de sesión incorrecto', errorMessage, [
      {text: 'OK', onPress: removeError},
    ]);
  }, [errorMessage]);

  useEffect(() => {
    if (success) {
      navigation.navigate('LoginScreen');
    }
  }, [success]);

  const onLogin = () => {
    Keyboard.dismiss();
    forgotPassword({email: email});
  };


  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Box />
        <Box
          py={7}
          px={6}
          top={5}
          rounded="md"
          alignSelf="center"
          width={400}
          height={800}>
          {/*Keyboard avoid view*/}
          <Box alignSelf="center">
            <Text fontSize="2xl" color="black" fontWeight="bold">
              Olvidé mi contraseña
            </Text>
          </Box>
          <Box alignSelf={'center'}>
            <Image
              source={require('../../assets/image/email.png')}
              style={{
                width: 350,
                height: 270,
              }}
              alt={'.'}
            />
          </Box>
          <Box alignSelf="center" mt={3}>
            <Text fontSize="md" color="black">
              Para restablecer tu contrseña escribe tu correo.
            </Text>
          </Box>
          <Box alignSelf="center" py={0} mt={0}>
            <FormControl mt={3} mb="3">
              <FormControl.Label>Email:</FormControl.Label>
              <Input
                selectionColor="black"
                size="2xl"
                variant="underlined"
                placeholderTextColor="black"
                placeholder="Ingresar correo electrónico"
                keyboardType="email-address"
                autoCorrect={false}
                onChangeText={value => onChange(value, 'email')}
                value={email}
                onSubmitEditing={onLogin}
                autoCapitalize="none"
              />
            </FormControl>
          </Box>
          <HStack space={2} alignItems="center" mb={5} mt={5}>
            <Center h="10" w="50%" rounded="md">
              <Button
                bg={'alpha.50'}
                onPress={() => navigation.goBack()} 
                width={'70%'}
                height={50}
                alignSelf="center">
                <Text fontSize="md" color="white" fontWeight="bold">
                  Cancelar
                </Text>
              </Button>
            </Center>
            <Center h="10" w="50%" rounded="md">
              <Button bg="omega.50" width={'70%'} onPress={onLogin} height={50}>
                <Text fontSize="md" color="white" bold>
                  Verificar
                </Text>
              </Button>
            </Center>
          </HStack>
        </Box>
      </KeyboardAvoidingView>
    </>
  );
};
