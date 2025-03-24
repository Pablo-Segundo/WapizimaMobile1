import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';
import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../../context/Auth/AuthContext';

export const AppleSigninFunction = () => {
    const { signUpApple } = useContext(AuthContext);
    const onAppleButtonPress = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            });
            signUpApple({ idToken: appleAuthRequestResponse.identityToken, nonce: appleAuthRequestResponse.nonce, fullName: appleAuthRequestResponse.fullName});
        } catch (error: any) {
            if (error.code === appleAuth.Error.CANCELED) {
                Alert.alert('Inicio de sesión con Apple cancelado.');
            } else {
                Alert.alert(error.message);
            }
        }
    };
    return (
        <>
            <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.DEFAULT}
                style={{
                    width: '95%',
                    height: 55,
                    borderWidth: 1,
                    borderRadius: 9,
                    margin: 2
                }}
                onPress={() => onAppleButtonPress()}
            />
        </>
    );
};
