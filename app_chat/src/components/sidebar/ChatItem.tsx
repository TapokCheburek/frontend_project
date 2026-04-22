import { MessageSquare, Trash2, Pencil } from 'lucide-react';
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
            className={`w-full text-left px-3 py-3 rounded-xl transition-all group relative border ${
                isActive
                    ? 'bg-brand-bg border-brand-border/50 shadow-sm'
                    : 'hover:bg-brand-bg border-transparent'
            }`}
        >
            <div className="flex items-start gap-3">
                <MessageSquare
                    className={`w-4 h-4 flex-shrink-0 mt-1 transition-colors ${
                        isActive
                            ? 'text-brand-primary'
                            : 'text-brand-text-dim group-hover:text-brand-text'
                    }`}
                />
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                        isActive ? 'text-brand-text' : 'text-brand-text-dim group-hover:text-brand-text'
                    }`}>
                        {title}
                    </p>
                    <p className="text-[10px] text-brand-text-dim/60 font-medium">
                        {date}
                    </p>
                </div>
                {isHovering && (
                    <div className="flex items-center gap-1 flex-shrink-0 animate-in fade-in slide-in-from-right-1 duration-200">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(id);
                            }}
                            className="p-1 px-1.5 rounded-lg hover:bg-brand-surface text-brand-text-dim hover:text-brand-primary transition-colors"
                            title="Переименовать"
                        >
                            <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(id);
                            }}
                            className="p-1 px-1.5 rounded-lg hover:bg-red-50 text-brand-text-dim hover:text-red-500 transition-colors"
                            title="Удалить"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>
        </button>
    );
}

export default ChatItem;
