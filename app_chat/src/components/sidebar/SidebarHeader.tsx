import { Plus } from 'lucide-react';

interface SidebarHeaderProps {
    onNewChat: () => void;
}

function SidebarHeader({ onNewChat }: SidebarHeaderProps) {
    return (
        <div className="px-4 mt-6 mb-2">
            <button
                onClick={onNewChat}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-primary text-white rounded-xl font-medium hover:brightness-110 transition-all shadow-md shadow-brand-primary/20 group"
            >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span>Новый чат</span>
            </button>
        </div>
    );
}

export default SidebarHeader;
