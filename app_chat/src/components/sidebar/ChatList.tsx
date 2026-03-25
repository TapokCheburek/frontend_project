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
    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Недавние чаты
            </div>

            {filteredChats.length === 0 ? (
                <div className="text-center py-8 px-4">
                    <p className="text-sm text-gray-500">
                        {searchQuery ? 'Чаты не найдены' : 'Нет чатов'}
                    </p>
                </div>
            ) : (
                <div className="space-y-1">
                    {filteredChats.map(chat => (
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
