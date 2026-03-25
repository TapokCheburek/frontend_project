import { Send } from 'lucide-react';

function ChatMessages() {
    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Send className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Начните новый разговор
                    </h2>
                    <p className="text-gray-600 max-w-md">
                        Отправьте сообщение, чтобы начать общение
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ChatMessages;
