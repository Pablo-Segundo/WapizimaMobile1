import React from 'react';
import { BrandProvider } from './BrandContext';


export const BrandState = ({ children }: any) => {
    return <BrandProvider>{children}</BrandProvider>;
};
