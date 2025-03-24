import React, { useContext } from 'react';
import { Alert, Dimensions } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AuthContext } from '../../context/Auth/AuthContext';
import { AlertDialog, Button, Center } from 'native-base';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '120031662204-98tq7nhkagbu853f2ua7tp0tk1p34b18.apps.googleusercontent.com',
  androidClientId:
    '120031662204-hs2u4g3d1k4i6gm9j961gj3gh7dbtu7r.apps.googleusercontent.com',
  iosClientId:
    '120031662204-lenn3akba6ma4l19of1mrh39vpja59o1.apps.googleusercontent.com',
});
export const GoogleSigninFunctionR = () => {
  const { signUpGoogle } = useContext(AuthContext);

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      signUpGoogle({ idToken: idToken });
    } catch (error : any) {
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
       style={{ width: 110, height: 55,
       }}
         size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
          onPress={() => setIsOpen(!isOpen)}
      />
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Términos y condiciones</AlertDialog.Header>
          <AlertDialog.Body>
          
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancelar
              </Button>
              <Button colorScheme='success' onPress= {() => {signInGoogle(), onClose()}}>
                Aceptar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};
