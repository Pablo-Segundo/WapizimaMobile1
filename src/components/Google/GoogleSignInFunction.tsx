import React, { useContext } from 'react';
import { Alert, Dimensions } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AuthContext } from '../../context/Auth/AuthContext';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '120031662204-98tq7nhkagbu853f2ua7tp0tk1p34b18.apps.googleusercontent.com',
  androidClientId:
    '120031662204-hs2u4g3d1k4i6gm9j961gj3gh7dbtu7r.apps.googleusercontent.com',
  iosClientId:
    '120031662204-lenn3akba6ma4l19of1mrh39vpja59o1.apps.googleusercontent.com',
});
export const GoogleSigninFunction = () => {
  const { signUpGoogle } = useContext(AuthContext);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      signUpGoogle({ idToken: idToken });
    } catch (error :any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert('Ha cancelado el proceso de inicio de sesión.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert('Iniciando sesión...');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert('No se ha encontrado google play services.');
      } else {
        Alert('Algo ha ocurrido al iniciar sesión.' + error.message);
      }
    }
  };

  return (
    <>
      <GoogleSigninButton
      style={{ width: '95%', height: 55, margin: 2, borderRadius: 9,
      }}
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          signInGoogle();
        }}
      />
    </>
  );
};
