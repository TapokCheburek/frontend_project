import ChatItem from './ChatItem';

interface Chat {
    id: string;
    title: string;
    date: string;
}

interface ChatListProps {
    chats: Chat[];
    activeId: string | null;
    searchQuery: string;
    onSelectChat: (id: string) => void;
    onEditChat: (id: string) => void;
    onDeleteChat: (id: string) => void;
}

function ChatList({
                      chats,
                      activeId,
                      searchQuery,
                      onSelectChat,
                      onEditChat,
                      onDeleteChat,
                  }: ChatListProps) {
    return (
        <div className="space-y-4">
            <div className="px-4 mt-2">
                <span className="text-[10px] font-bold text-brand-text-dim/50 uppercase tracking-widest px-2">История чатов</span>
            </div>

            {chats.length === 0 ? (
                <div className="text-center py-10 px-4 animate-in fade-in duration-500">
                    <p className="text-sm text-brand-text-dim">
                        {searchQuery ? 'Совпадений не найдено' : 'Список чатов пуст'}
                    </p>
                </div>
            ) : (
                <div className="space-y-1 px-2">
                    {chats.map(chat => (
                        <ChatItem
                            key={chat.id}
                            id={chat.id}
                            title={chat.title}
                            date={chat.date}
                            isActive={activeId === chat.id}
                            onSelect={onSelectChat}
                            onEdit={onEditChat}
                            onDelete={onDeleteChat}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatList;
