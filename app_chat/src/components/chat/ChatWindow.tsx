import { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import type { MessageData } from '../../types/message';
import InputArea from './InputArea';
import SettingsPanel from './SettingsPanel';

const CHAT_TITLES: { [key: string]: string } = {
    '1': 'Проект по React компонентам',
    '2': 'Обсуждение дизайна UI',
    '3': 'Вопросы по TypeScript',
    '4': 'Оптимизация производительности',
    '5': 'API интеграция и backend',
};

interface ChatWindowProps {
    activeChat?: string | null;
}

function ChatWindow({ activeChat = '1' }: ChatWindowProps) {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = (content: string) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // 1. Добавляем сообщение пользователя
        const userMessage: MessageData = {
            id: Date.now().toString(),
            role: 'user',
            content: content,
            timestamp: timestamp
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        // 2. Симулируем ответ ассистента через 1.5 секунды
        setTimeout(() => {
            const assistantMessage: MessageData = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Вы написали: "${content}". Это тестовый ответ ассистента. В будущем здесь будет интеграция с Gemini API.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const chatTitle = activeChat && CHAT_TITLES[activeChat] ? CHAT_TITLES[activeChat] : 'Чат';

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
