import React, { createContext, useContext, useReducer } from 'react';
import { OrderReducer, OrderState } from './OrderReducer';

type OrderContextProps = {
	currentAccount: string | null;
	setCurrentAccount: (account: string) => void;
};

const OrderInitialState: OrderState = {
	currentAccount: '',
};

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(OrderReducer, OrderInitialState);

	const setCurrentAccount = (account: string) => {
		dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: account });
	};

	// const updateBilling = 

	return (
		<OrderContext.Provider
			value={{
				...state,
				setCurrentAccount,
			}}>
			{children}
		</OrderContext.Provider>
	);
};
