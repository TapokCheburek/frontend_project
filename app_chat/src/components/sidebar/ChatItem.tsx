import { MessageSquare, Trash2, CreditCard as Edit2 } from 'lucide-react';
import { useState } from 'react';

interface ChatItemProps {
    id: string;
    title: string;
    date: string;
    isActive: boolean;
    onSelect: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

function ChatItem({ id, title, date, isActive, onSelect, onEdit, onDelete }: ChatItemProps) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <button
            onClick={() => onSelect(id)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`w-full text-left px-3 py-3 rounded-lg transition-colors group relative ${
                isActive
                    ? 'bg-blue-50 text-blue-900'
                    : 'hover:bg-gray-100 text-gray-900'
            }`}
        >
            <div className="flex items-start gap-3">
                <MessageSquare
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${
                        isActive
                            ? 'text-blue-600'
                            : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                        {title}
                    </p>
                    <p className={`text-xs truncate ${
                        isActive
                            ? 'text-blue-700/70'
                            : 'text-gray-500'
                    }`}>
                        {date}
                    </p>
                </div>
                {isHovering && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(id);
                            }}
                            className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(id);
                            }}
                            className="p-1 rounded hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </button>
    );
}

export default ChatItem;
