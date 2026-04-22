import { Send, Square, ImagePlus, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
    onSend: (message: string) => void;
    isGenerating?: boolean;
}

function InputArea({ onSend, isGenerating = false }: InputAreaProps) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Автоподстройка высоты textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, 120); // ~5 строк при стандартном размере
            textarea.style.height = `${newHeight}px`;
        }
    }, [message]);

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleStop = () => {
        console.log('Генерация остановлена');
    };

    return (
        <div className="border-t border-gray-200 bg-white p-4 md:p-6 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-end gap-2 md:gap-4 bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    {/* Кнопка прикрепления изображения */}
                    <button
                        title="Прикрепить изображение"
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-white rounded-xl transition-all"
                    >
                        <ImagePlus className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    {/* Поле ввода */}
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Напишите сообщение..."
                        className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-sm md:text-base text-gray-800 placeholder-gray-400 min-h-[44px] max-h-[120px]"
                    />

                    {/* Кнопки управления */}
                    <div className="flex gap-2 p-1">
                        {isGenerating ? (
                            <button
                                onClick={handleStop}
                                title="Остановить генерацию"
                                className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all flex items-center justify-center"
                            >
                                <Square className="w-5 h-5 fill-current" />
                            </button>
                        ) : null}

                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || isGenerating}
                            className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                                message.trim() && !isGenerating
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md translate-y-[-1px]'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isGenerating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Подсказка под вводом */}
                <div className="mt-2 text-center">
                    <span className="text-[10px] md:text-xs text-gray-400">
                        Shift + Enter для новой строки. Enter для отправки.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default InputArea;
