export interface Direction {
  name: string;
  default: boolean;
  street: string;
  between_street: string;
  postalcode: string;
  city: string;
  references: string;
  no_int: string;
  state: State;
  municipality: Municipality;
  _id: string;
  label: string;
}

export interface Municipality {
  name: string;
  _id: string;
}

export interface State {
  name: string;
  _id: string;
}

export interface AllDirections {
  directions: Direction[];
}

export interface BillingAddress {
  legal_name: string;
  tax_id: string;
  tax_system: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Address {
  zip: string;
  street: string;
  exterior: string;
  interior: string;
  neighborhood: string;
  city: string;
  municipality: string;
  state: string;
}

export interface SatAddress {
  status: string;
  SATDirection: BillingAddress;
  municipality: Municipality;
  state: State;
}

export interface TaxSystem {
  taxes: Tax[];
}

export interface Tax {
  status: boolean;
  _id: string;
  name: string;
  code: string;
}
