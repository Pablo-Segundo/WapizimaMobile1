import React from 'react';
import {PermissionsProvider} from './PermissionsContext';

export const PermissionsState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};
