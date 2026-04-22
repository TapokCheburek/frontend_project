import { Send, Square, ImagePlus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
    onSend: (message: string) => void;
    isLoading?: boolean;
}

function InputArea({ onSend, isLoading = false }: InputAreaProps) {
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
        if (message.trim() && !isLoading) {
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
        <div className="border-t border-brand-border bg-brand-bg p-2 sm:p-4 md:p-6 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
            <div className="max-w-4xl mx-auto">
                <div className={`flex items-end gap-1 sm:gap-3 bg-brand-surface rounded-2xl p-1.5 border border-brand-border transition-all ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10'
                }`}>
                    {/* Кнопка прикрепления изображения */}
                    <button
                        title="Прикрепить изображение"
                        disabled={isLoading}
                        className="p-3 text-brand-text-dim hover:text-brand-primary hover:bg-brand-bg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                        <ImagePlus className="w-6 h-6" />
                    </button>

                    {/* Поле ввода */}
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        placeholder={isLoading ? "Ждите..." : "Сообщение..."}
                        className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-1 text-sm md:text-base text-brand-text placeholder-brand-text-dim/40 min-h-[44px] max-h-[120px] disabled:cursor-not-allowed"
                    />

                    {/* Кнопки управления */}
                    <div className="flex gap-1 p-0.5">
                        {isLoading ? (
                            <button
                                onClick={handleStop}
                                title="Остановить"
                                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md flex items-center justify-center animate-pulse"
                            >
                                <Square className="w-5 h-5 fill-current" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSend}
                                disabled={!message.trim()}
                                className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                                    message.trim()
                                        ? 'bg-brand-primary text-white hover:opacity-90 shadow-md translate-y-[-1px]'
                                        : 'bg-brand-border text-brand-text-dim cursor-not-allowed'
                                }`}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Подсказка под вводом */}
                <div className="mt-2 text-center">
                    <span className="text-[10px] md:text-xs text-brand-text-dim/60">
                        Shift + Enter для новой строки. Enter для отправки.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default InputArea;
