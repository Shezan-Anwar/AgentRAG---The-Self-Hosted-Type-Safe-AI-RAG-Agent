export interface Message {
  id: string;
  sender: 'user' | 'agent'; // Strict literal types: can only be one of these two strings
  text: string;
  timestamp: string;
}