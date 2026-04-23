import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Chat, ChatState, ChatAction } from '../../types/chat';
import type { Message } from '../../types/MessageType';
import { storage } from '../../utils/storage';

const STORAGE_KEY = 'ai_studio_chat_state';

interface ChatContextType extends ChatState {
    setActiveChat: (id: string) => void;
    addMessage: (chatId: string, message: Message) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    createChat: (title: string) => void;
    updateChatTitle: (chatId: string, title: string) => void;
    deleteChat: (chatId: string) => void;
}

const DEFAULT_CHATS: Chat[] = [
    {
        id: '1',
        title: 'Проект по React компонентам',
        lastMessageTime: '14:20',
        messages: [
            { id: 'm1', role: 'assistant', content: 'Привет! Как продвигается проект по React компонентам?', timestamp: '14:15' },
            { id: 'm2', role: 'user', content: 'Все отлично, работаю над стилями.', timestamp: '14:20' }
        ]
    },
    {
        id: '2',
        title: 'Обсуждение дизайна UI',
        lastMessageTime: 'Вчера',
        messages: [
            { id: 'm3', role: 'assistant', content: 'Что думаешь о новой цветовой схеме?', timestamp: 'Вчера 10:00' }
        ]
    },
    {
        id: '3',
        title: 'Вопросы по TypeScript',
        lastMessageTime: 'Пн',
        messages: []
    },
];

const getInitialState = (): ChatState => {
    const savedState = storage.load<ChatState>(STORAGE_KEY);
    if (savedState) {
        return {
            ...savedState,
            isLoading: false, // Don't persist loading state
            error: null       // Don't persist error state
        };
    }
    return {
        chats: DEFAULT_CHATS,
        activeChatId: '1',
        isLoading: false,
        error: null,
    };
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {
        case 'SET_CHATS':
            return { ...state, chats: action.payload };
        case 'SET_ACTIVE_CHAT':
            return { ...state, activeChatId: action.payload };
        case 'ADD_MESSAGE':
            return {
                ...state,
                chats: state.chats.map(chat =>
                    chat.id === action.payload.chatId
                        ? {
                            ...chat,
                            messages: [...chat.messages, action.payload.message],
                            lastMessageTime: action.payload.message.timestamp
                        }
                        : chat
                )
            };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'CREATE_CHAT':
            return {
                ...state,
                chats: [action.payload, ...state.chats],
                activeChatId: action.payload.id
            };
        case 'UPDATE_CHAT_TITLE':
            return {
                ...state,
                chats: state.chats.map(chat =>
                    chat.id === action.payload.chatId
                        ? { ...chat, title: action.payload.title }
                        : chat
                )
            };
        case 'DELETE_CHAT':
            const filteredChats = state.chats.filter(chat => chat.id !== action.payload);
            return {
                ...state,
                chats: filteredChats,
                activeChatId: state.activeChatId === action.payload
                    ? (filteredChats.length > 0 ? filteredChats[0].id : null)
                    : state.activeChatId
            };
        default:
            return state;
    }
}

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, undefined, getInitialState);

    useEffect(() => {
        storage.save(STORAGE_KEY, {
            chats: state.chats,
            activeChatId: state.activeChatId
        });
    }, [state.chats, state.activeChatId]);

    const setActiveChat = (id: string) => dispatch({ type: 'SET_ACTIVE_CHAT', payload: id });

    const addMessage = (chatId: string, message: Message) =>
        dispatch({ type: 'ADD_MESSAGE', payload: { chatId, message } });

    const setLoading = (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading });

    const setError = (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error });

    const createChat = (title: string) => {
        const newChat: Chat = {
            id: Date.now().toString(),
            title: title,
            lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            messages: []
        };
        dispatch({ type: 'CREATE_CHAT', payload: newChat });
    };

    const updateChatTitle = (chatId: string, title: string) =>
        dispatch({ type: 'UPDATE_CHAT_TITLE', payload: { chatId, title } });

    const deleteChat = (chatId: string) =>
        dispatch({ type: 'DELETE_CHAT', payload: chatId });

    return (
        <ChatContext.Provider value={{
            ...state,
            setActiveChat,
            addMessage,
            setLoading,
            setError,
            createChat,
            updateChatTitle,
            deleteChat
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
