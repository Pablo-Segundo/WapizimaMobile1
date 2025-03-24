import React from 'react';
import {CategoryProvider} from './CategoryContext';

export const CategoryState = ({children}: any) => {
  return <CategoryProvider>{children}</CategoryProvider>;
};
