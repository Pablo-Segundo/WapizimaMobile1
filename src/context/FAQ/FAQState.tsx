import React from 'react';
import {FAQProvider} from './FAQContext';

export const FAQState = ({children}: any) => {
  return <FAQProvider>{children}</FAQProvider>;
};
