import { MessageSquare, Plus, Search, HelpCircle, LogOut } from 'lucide-react';

export default function Sidebar() {
    const chats = [
        { id: 1, title: 'Проект по React компонентам', time: '14:20' },
        { id: 2, title: 'Обсуждение дизайна UI', time: 'Вчера' },
        { id: 3, title: 'Вопросы по TypeScript', time: 'Пн' },
    ];

    return (
        <div className="flex flex-col h-full bg-brand-surface border-r border-brand-border">
            {/* Logo / Header */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-primary/20">
                    AI
                </div>
                <div>
                    <h1 className="text-lg font-bold text-brand-text leading-tight">Studio Chat</h1>
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">v2.0 Beta</span>
                </div>
            </div>

            {/* New Chat Button */}
            <div className="px-4 mb-6">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-brand-primary text-white rounded-xl font-medium hover:brightness-110 transition-all shadow-md shadow-brand-primary/20 group">
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span>Новый чат</span>
                </button>
            </div>

            {/* Search */}
            <div className="px-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
                    <input
                        type="text"
                        placeholder="Поиск чатов..."
                        className="w-full pl-10 pr-4 py-2 bg-brand-bg border border-brand-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-brand-text"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
                <div className="px-4 mb-2">
                    <span className="text-[10px] font-bold text-brand-text-dim/50 uppercase tracking-widest px-2">История</span>
                </div>
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        className={`w-full flex flex-col items-start gap-1 p-3 rounded-xl transition-all hover:bg-brand-bg group ${chat.id === 1 ? 'bg-brand-bg border border-brand-border/50 shadow-sm' : ''}`}
                    >
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <MessageSquare className={`w-4 h-4 shrink-0 ${chat.id === 1 ? 'text-brand-primary' : 'text-brand-text-dim'}`} />
                                <span className={`text-sm font-medium truncate ${chat.id === 1 ? 'text-brand-text' : 'text-brand-text-dim group-hover:text-brand-text'}`}>
                                    {chat.title}
                                </span>
                            </div>
                            <span className="text-[10px] text-brand-text-dim/60 font-medium">{chat.time}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-brand-border space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-brand-text-dim hover:text-brand-text hover:bg-brand-bg transition-colors text-sm">
                    <HelpCircle className="w-5 h-5" />
                    <span>Помощь и поддержка</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm">
                    <LogOut className="w-5 h-5" />
                    <span>Выйти</span>
                </button>
            </div>
        </div>
    );
}
