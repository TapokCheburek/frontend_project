import { ChevronDown, Settings } from 'lucide-react';

interface ChatHeaderProps {
    chatTitle: string;
    onMenu: () => void;
}

function ChatHeader({ chatTitle, onMenu }: ChatHeaderProps) {
    return (
        <div className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">{chatTitle}</h1>
                <ChevronDown className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
            </div>
            <button
                onClick={onMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                title="Настройки"
            >
                <Settings className="w-5 h-5" />
            </button>
        </div>
    );
}

export default ChatHeader;
