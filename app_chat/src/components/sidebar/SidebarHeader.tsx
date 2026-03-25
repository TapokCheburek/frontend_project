import { Plus } from 'lucide-react';

interface SidebarHeaderProps {
    onNewChat: () => void;
}

function SidebarHeader({ onNewChat }: SidebarHeaderProps) {
    return (
        <div className="p-6 border-b border-gray-200">
            <button
                onClick={onNewChat}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
            >
                <Plus className="w-5 h-5" />
                Новый чат
            </button>
        </div>
    );
}

export default SidebarHeader;
