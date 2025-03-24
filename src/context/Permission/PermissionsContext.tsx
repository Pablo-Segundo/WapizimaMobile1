import React, {createContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openSettings,
} from 'react-native-permissions';

export interface PermissionsState {
  cameraStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  cameraStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissionsCamera: PermissionsState;
  //Permisos de Camara
  askCameraPermission: () => void;
  checkCameraPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
  const [permissionsCamera, setPermissionsCamera] =
    useState(permissionInitState);

  useEffect(() => {
    checkCameraPermission();
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }

      checkCameraPermission();
    });
  }, []);

  const askCameraPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.CAMERA);
    } else {
      permissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
    }

    if (permissionStatus === 'blocked') {
      openSettings();
    }

    setPermissionsCamera({
      ...permissionsCamera,
      cameraStatus: permissionStatus,
    });
  };

  const checkCameraPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.CAMERA);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
    }

    setPermissionsCamera({
      ...permissionsCamera,
      cameraStatus: permissionStatus,
    });
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissionsCamera,
        checkCameraPermission,
        askCameraPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
