export interface ticket {
  subject: String;
  messages: message[];
  status: Number;
  client_id: String;
  user_id: String;
}
export interface attachment {
  file: String;
}
export interface ticketsResponse {
  tickets: ticket[];
}
export interface message {
  text: String;
  client_id: String;
  user_id: String;
  attachments: attachment[];
}
export interface ticketData {
  subject: String;
  message: String;
}
export interface MessageResponse {
  message: string;
}
