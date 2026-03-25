import { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const CHAT_TITLES: { [key: string]: string } = {
    '1': 'Проект по React компонентам',
    '2': 'Обсуждение дизайна UI',
    '3': 'Вопросы по TypeScript',
    '4': 'Оптимизация производительности',
    '5': 'API интеграция и backend',
};

interface ChatAreaProps {
    activeChat?: string | null;
}

function ChatArea({ activeChat = '1' }: ChatAreaProps) {
    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = (message: string) => {
        setMessages([...messages, message]);
        console.log('Сообщение отправлено:', message);
    };

    const handleMenu = () => {
        console.log('Меню чата');
    };

    const chatTitle = activeChat && CHAT_TITLES[activeChat] ? CHAT_TITLES[activeChat] : 'Чат';

    return (
        <div className="flex-1 flex flex-col h-full">
            <ChatHeader chatTitle={chatTitle} onMenu={handleMenu} />
            <ChatMessages />
            <ChatInput onSend={handleSendMessage} />
        </div>
    );
}

export default ChatArea;
