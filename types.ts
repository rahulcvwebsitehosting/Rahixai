
export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface FileData {
  name: string;
  type: string;
  size: number;
  data: string; // base64
  previewUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
  files?: FileData[];
  sources?: { title: string; uri: string }[];
  isImageGeneration?: boolean;
}

export interface CanvasState {
  isOpen: boolean;
  content: string;
  mode: 'text' | 'code';
  language: string;
  title: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}
