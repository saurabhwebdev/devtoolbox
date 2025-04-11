export interface FeedbackData {
  type: 'feedback';
  name: string;
  email: string;
  message: string;
  createdAt?: any; // Firebase Timestamp
}

export interface ToolRequestData {
  type: 'tool-request';
  name: string;
  email: string;
  toolName: string;
  toolDescription: string;
  createdAt?: any; // Firebase Timestamp
}

export type FeedbackResponse = {
  success: boolean;
  id?: string;
  error?: any;
}; 