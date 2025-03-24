import React from 'react';
import {AuthProvider} from './AuthContext';

export const AuthState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};
