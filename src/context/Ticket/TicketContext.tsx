import React, {createContext, useReducer, useContext} from 'react';
import Wapizima from '../../api/Wapizima';
import axios from 'axios';
import {
  ticketsResponse,
  ticket,
  MessageResponse,
  ticketData,
} from '../../interfaces/TicketInterfaces';
import {TicketReducer} from './TicketReducer';
import {AuthContext} from '../Auth/AuthContext';
import {ImagePickerResponse} from 'react-native-image-picker';

type TicketContextProps = {
  errorMessage: string;
  ticket: ticket | null;
  tickets: ticketsResponse;
  message: string | null;
  success: boolean | null;
  getMyTickets: () => void;
  saveTicket: () => void;
  getOneTicket: () => void;
  removeError: () => void;
  addError: (message: string) => void;
  removeSuccess: () => void;
};

const TicketInitialState: TicketState = {
  ticket: null,
  tickets: [],
  message: null,
  success: false,
  errorMessage: '',
};

export const TicketContext = createContext({} as TicketContextProps);

export const TicketProvider = ({children}: any) => {
  const {user} = useContext(AuthContext);

  const [state, dispatch] = useReducer(TicketReducer, TicketInitialState);

  const getMyTickets = async () => {
    try {
      const response = await Wapizima.get<ticketsResponse>(
        `/tickets/my-tickets-clients/${user?.id}/`,
      );
      dispatch({
        type: 'getTickets',
        payload: response.data.tickets,
      });
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ningun ticket de soporte disponible',
      });
    }
  };

  const saveTicket = async (
    {subject, message}: ticketData,
    photo: ImagePickerResponse,
  ) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri
      //uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    console.log(photo);

    try {
      const response = await Wapizima.post<MessageResponse>('/tickets', photo);

      dispatch({
        type: 'saveTicket',
        payload: response.data.message,
      });
    } catch (error: any) {
      console.log(error.response.data, 'saveTicket Error');
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se pudo guardar correctamente el ticket',
      });
    }
  };

  const getOneTicket = async (_id: any) => {
    try {
      const response = await Wapizima.get<ticket>(`/tickets/${_id}/`);
      dispatch({
        type: 'getTicket',
        payload: response.data.ticket,
      });
    } catch (error: any) {
      console.log(error.response.data, 'getOneTicket Error');
      dispatch({
        type: 'addError',
        payload:
          error.response.data.message ||
          'No se encontró ningun ticket de soporte disponible',
      });
    }
  };

  const addError = (message: string) => {
    dispatch({
      type: 'addError',
      payload: message,
    });
  };

  const removeSuccess = () => {
    dispatch({
      type: 'removeSuccess',
    });
  };

  return (
    <TicketContext.Provider
      value={{
        getMyTickets,
        addError,
        getOneTicket,
        saveTicket,
        removeSuccess,
        ...state,
      }}>
      {children}
    </TicketContext.Provider>
  );
};
