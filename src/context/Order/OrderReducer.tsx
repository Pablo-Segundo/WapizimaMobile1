export interface OrderState {
	currentAccount: string | null;
}

export type OrderAction =
	| {type: 'SET_CURRENT_ACCOUNT'; payload: string | null}
	| {type: 'CLEAR_CURRENT_ACCOUNT'};

export const OrderReducer = (
	state: OrderState,
	action: OrderAction,
): OrderState => {
	switch (action.type) {
		case 'SET_CURRENT_ACCOUNT':
			return {
				...state,
				currentAccount: action.payload,
			};
		case 'CLEAR_CURRENT_ACCOUNT':
			return {
				...state,
				currentAccount: null,
			};
		default:
			return state;
	}
};
