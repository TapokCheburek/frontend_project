import { useState, useMemo } from 'react';
import { HelpCircle, LogOut } from 'lucide-react';
import { useChat } from '../../app/providers/ChatProvider';
import SidebarHeader from './SidebarHeader';
import SearchInput from './SearchInput';
import ChatList from './ChatList';

export default function Sidebar() {
    const { chats, activeChatId, setActiveChat, createChat, updateChatTitle, deleteChat } = useChat();
    const [searchQuery, setSearchQuery] = useState('');

    const handleNewChat = () => {
        const title = prompt('Введите название нового чата:');
        if (title?.trim()) {
            createChat(title.trim());
        }
    };

    const handleEditChat = (id: string) => {
        const chat = chats.find(c => c.id === id);
        if (!chat) return;

        const newTitle = prompt('Введите новое название чата:', chat.title);
        if (newTitle?.trim() && newTitle !== chat.title) {
            updateChatTitle(id, newTitle.trim());
        }
    };

    const handleDeleteChat = (id: string) => {
        const chat = chats.find(c => c.id === id);
        if (!chat) return;

        if (confirm(`Вы действительно хотите удалить чат "${chat.title}"?`)) {
            deleteChat(id);
        }
    };

    const filteredChats = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return chats.filter(chat => {
            const titleMatch = chat.title.toLowerCase().includes(query);
            const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
            const contentMatch = lastMessage ? lastMessage.content.toLowerCase().includes(query) : false;
            return titleMatch || contentMatch;
        });
    }, [chats, searchQuery]);

    return (
        <div className="flex flex-col h-full bg-brand-surface border-r border-brand-border">
            {/* Logo / Title Area (Optional, but let's keep it clean) */}
            <div className="p-6 pb-0 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-primary/20">
                    AI
                </div>
                <div>
                    <h1 className="text-lg font-bold text-brand-text leading-tight">Studio Chat</h1>
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">v2.0 Beta</span>
                </div>
            </div>

            <SidebarHeader onNewChat={handleNewChat} />

            <SearchInput onSearch={setSearchQuery} />

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                <ChatList
                    chats={filteredChats.map(c => ({
                        id: c.id,
                        title: c.title,
                        date: c.lastMessageTime
                    }))}
                    activeId={activeChatId}
                    searchQuery={searchQuery}
                    onSelectChat={setActiveChat}
                    onEditChat={handleEditChat}
                    onDeleteChat={handleDeleteChat}
                />
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-brand-border space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-brand-text-dim hover:text-brand-text hover:bg-brand-bg transition-colors text-sm">
                    <HelpCircle className="w-5 h-5" />
                    <span>Помощь и поддержка</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm">
                    <LogOut className="w-5 h-5" />
                    <span>Выйти</span>
                </button>
            </div>
        </div>
    );
}
