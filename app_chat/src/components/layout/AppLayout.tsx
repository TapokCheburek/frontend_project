import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../sidebar/Sidebar';
import ChatWindow from '../chat/ChatWindow';

function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-brand-surface">
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 lg:hidden bg-brand-bg p-2 rounded-xl shadow-lg border border-brand-border text-brand-text-dim hover:text-brand-text transition-colors"
                aria-label="Toggle sidebar"
            >
                {isSidebarOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                ) : (
                    <Menu className="w-6 h-6 text-gray-700" />
                )}
            </button>

            <div
                className={`
          fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <Sidebar />
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <div className="flex-1 flex flex-col overflow-hidden">
                <ChatWindow />
            </div>
        </div>
    );
}

export default AppLayout;
