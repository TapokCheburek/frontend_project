import { useState, useMemo } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import type { Message } from '../../types/MessageType';
import InputArea from './InputArea';
import SettingsPanel from './SettingsPanel';
import { useChat } from '../../app/providers/ChatProvider';

function ChatWindow() {
    const { chats, activeChatId, addMessage, isLoading, setLoading } = useChat();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const activeChat = useMemo(() =>
            chats.find(chat => chat.id === activeChatId),
        [chats, activeChatId]);

    const handleSendMessage = (content: string) => {
        if (!activeChatId) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // 1. Добавляем сообщение пользователя
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: content,
            timestamp: timestamp
        };

        addMessage(activeChatId, userMessage);
        setLoading(true);

        // 2. Симулируем ответ ассистента через 1.5 секунды
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Вы написали: "${content}". Это тестовый ответ ассистента. В будущем здесь будет интеграция с Gemini API.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            addMessage(activeChatId, assistantMessage);
            setLoading(false);
        }, 1500);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const chatTitle = activeChat ? activeChat.title : 'Чат';
    const messages = activeChat ? activeChat.messages : [];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-brand-bg relative">
            <ChatHeader chatTitle={chatTitle} onMenu={toggleSettings} />
            <MessageList messages={messages} isLoading={isLoading} />
            <InputArea onSend={handleSendMessage} isLoading={isLoading} />

            <SettingsPanel
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
}

export default ChatWindow;
