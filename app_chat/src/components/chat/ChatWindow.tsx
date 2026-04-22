import { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
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
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleSendMessage = (message: string) => {
        console.log('Сообщение отправлено:', message);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const chatTitle = activeChat && CHAT_TITLES[activeChat] ? CHAT_TITLES[activeChat] : 'Чат';

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white relative">
            <ChatHeader chatTitle={chatTitle} onMenu={toggleSettings} />
            <MessageList />
            <InputArea onSend={handleSendMessage} />

            <SettingsPanel
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
}

export default ChatWindow;
