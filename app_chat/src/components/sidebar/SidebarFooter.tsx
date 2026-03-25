import { User, Settings } from 'lucide-react';

interface SidebarFooterProps {
    onProfile: () => void;
    onSettings: () => void;
}

function SidebarFooter({ onProfile, onSettings }: SidebarFooterProps) {
    return (
        <div className="border-t border-gray-200 p-4">
            <div className="space-y-1">
                <button
                    onClick={onProfile}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">Профиль</span>
                </button>
                <button
                    onClick={onSettings}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-700 hover:text-gray-900"
                >
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Настройки</span>
                </button>
            </div>
        </div>
    );
}

export default SidebarFooter;
