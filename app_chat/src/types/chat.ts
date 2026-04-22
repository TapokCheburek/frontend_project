import type { Message } from './MessageType';

export interface Chat {
    id: string;
    title: string;
    lastMessageTime: string;
    messages: Message[];
}

export interface ChatState {
    chats: Chat[];
    activeChatId: string | null;
    isLoading: boolean;
    error: string | null;
}

export type ChatAction =
    | { type: 'SET_CHATS'; payload: Chat[] }
    | { type: 'SET_ACTIVE_CHAT'; payload: string }
    | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'CREATE_CHAT'; payload: Chat }
    | { type: 'UPDATE_CHAT_TITLE'; payload: { chatId: string; title: string } }
    | { type: 'DELETE_CHAT'; payload: string };
