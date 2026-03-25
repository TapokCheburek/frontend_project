import { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import SearchInput from './SearchInput';
import ChatList from './ChatList';
import SidebarFooter from './SidebarFooter';

interface Chat {
    id: string;
    title: string;
    date: string;
}

const MOCK_CHATS: Chat[] = [
    { id: '1', title: 'Проект по React компонентам', date: 'Сегодня 14:30' },
    { id: '2', title: 'Обсуждение дизайна UI', date: 'Вчера 09:15' },
    { id: '3', title: 'Вопросы по TypeScript', date: '23 марта' },
    { id: '4', title: 'Оптимизация производительности', date: '22 марта' },
    { id: '5', title: 'API интеграция и backend', date: '21 марта' },
];

function Sidebar() {
    const [activeChat, setActiveChat] = useState<string | null>('1');
    const [searchQuery, setSearchQuery] = useState('');

    const handleNewChat = () => {
        console.log('Создать новый чат');
    };

    const handleSelectChat = (id: string) => {
        setActiveChat(id);
    };

    const handleEditChat = (id: string) => {
        console.log('Редактировать чат:', id);
    };

    const handleDeleteChat = (id: string) => {
        console.log('Удалить чат:', id);
    };

    const handleProfile = () => {
        console.log('Открыть профиль');
    };

    const handleSettings = () => {
        console.log('Открыть настройки');
    };

    return (
        <div className="h-full bg-white border-r border-gray-200 flex flex-col">
            <SidebarHeader onNewChat={handleNewChat} />
            <SearchInput onSearch={setSearchQuery} />

            <div className="flex-1 overflow-y-auto">
                <ChatList
                    chats={MOCK_CHATS}
                    activeId={activeChat}
                    searchQuery={searchQuery}
                    onSelectChat={handleSelectChat}
                    onEditChat={handleEditChat}
                    onDeleteChat={handleDeleteChat}
                />
            </div>

            <SidebarFooter onProfile={handleProfile} onSettings={handleSettings} />
        </div>
    );
}

export default Sidebar;
