export interface StatesResponse {
  states: State[];
}

export interface State {
  status: boolean;
  _id: string;
  name: string;
}
