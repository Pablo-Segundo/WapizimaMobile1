import {
  ticketsResponse,
  ticket,
  MessageResponse,
} from '../../interfaces/TicketInterfaces';

export interface TicketState {
  errorMessage: string;
  ticket: ticket | null;
  tickets: ticketsResponse | null;
  message: string | null;
  success: boolean | null;
}

export type TicketAction =
  | {type: 'getTickets'; payload: ticketsResponse}
  | {type: 'getTicket'; payload: ticket}
  | {type: 'saveTicket'; payload: string}
  | {type: 'addError'; payload: string}
  | {type: 'removeSuccess'};

export const TicketReducer = (
  state: TicketState,
  action: TicketAction,
): TicketState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        success: false,
      };

    case 'getTickets':
      return {
        ...state,
        errorMessage: '',
        tickets: action.payload,
        success: false,
      };

    case 'getTicket':
      return {
        ...state,
        errorMessage: '',
        ticket: action.payload,
        success: false,
      };

    case 'saveTicket':
      return {
        ...state,
        message: action.payload,
        success: true,
        errorMessage: '',
      };

    case 'removeSuccess':
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
