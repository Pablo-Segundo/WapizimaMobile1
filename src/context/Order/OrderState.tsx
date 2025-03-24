import React from 'react';
import {OrderProvider} from './OrderContext';

export const OrderState = ({children}: any) => {
	return <OrderProvider>{children}</OrderProvider>;
};
