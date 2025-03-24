import React from 'react';
import {OfferProvider} from './OfferContext';

export const OfferState = ({children}: any) => {
  return <OfferProvider>{children}</OfferProvider>;
};
