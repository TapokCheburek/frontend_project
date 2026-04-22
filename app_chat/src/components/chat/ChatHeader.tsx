import { ChevronDown, Settings } from 'lucide-react';
import { Toggle } from '../ui/Toggle';

interface ChatHeaderProps {
    chatTitle: string;
    onMenu: () => void;
}

function ChatHeader({ chatTitle, onMenu }: ChatHeaderProps) {
    return (
        <div className="border-b border-brand-border bg-brand-bg px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-brand-text">{chatTitle}</h1>
                <ChevronDown className="w-5 h-5 text-brand-text-dim cursor-pointer hover:text-brand-text transition-colors" />
            </div>
            <div className="flex items-center gap-4">
                <Toggle />
                <button
                    onClick={onMenu}
                    className="p-2 rounded-xl border border-brand-border bg-brand-surface text-brand-text-dim hover:text-brand-text hover:bg-brand-border/10 transition-all"
                    title="Настройки"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;
