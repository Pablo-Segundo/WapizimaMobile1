import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS, request } from 'react-native-permissions';

export const usePermissions = () => {

    const checkNotification = async () => {
        if (Platform.OS === 'ios') {
            const authStatus = await messaging().requestPermission();
            const enabled =
              authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          
            if (enabled) {
              console.log('Authorization status:', authStatus);
            }
        }else{
         const status = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
         console.log(status);
        
        }
       
    }

   

    return { checkNotification}

}