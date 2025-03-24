import React from 'react';
import {TicketProvider} from './TicketContext';

export const TicketState = ({children}: any) => {
  return <TicketProvider>{children}</TicketProvider>;
};
