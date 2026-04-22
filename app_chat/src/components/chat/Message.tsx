import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Copy, Check, User, Bot } from 'lucide-react';

interface MessageProps {
    text: string;
    sender: 'user' | 'assistant';
    timestamp: string;
    senderName?: string;
}

function Message({ text, sender, timestamp, senderName }: MessageProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const name = senderName || (sender === 'user' ? 'Вы' : 'AI Ассистент');

    return (
        <div className={`flex w-full group ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                    {sender === 'user' ? (
                        <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    ) : (
                        <Bot className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                    )}
                </div>

                {/* Content Area */}
                <div className={`flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}>
                    {/* Sender Info */}
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {name}
                        </span>
                        <span className="text-[10px] text-gray-400">
                            {timestamp}
                        </span>
                    </div>

                    {/* Message Bubble */}
                    <div className="relative group/bubble">
                        <div className={`rounded-2xl px-4 py-3 shadow-sm transition-all min-w-0 ${
                            sender === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 hover:border-gray-200'
                        }`}>
                            <div className={`markdown-content prose-sm max-w-none break-words ${sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                    components={{
                                        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed font-normal">{children}</p>,
                                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                        em: ({ children }) => <em className="italic">{children}</em>,
                                        ul: ({ children }) => <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>,
                                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                        code: ({ children, className }) => {
                                            const isInline = !className;
                                            return isInline ? (
                                                <code className={`px-1.5 py-0.5 rounded font-mono text-[0.85em] ${sender === 'user' ? 'bg-blue-700 text-blue-50' : 'bg-gray-100 text-pink-600'}`}>
                                                    {children}
                                                </code>
                                            ) : (
                                                <pre className="p-3 rounded-lg bg-gray-900 text-gray-100 overflow-x-auto my-2 font-mono text-xs leading-normal">
                                                    <code>{children}</code>
                                                </pre>
                                            );
                                        },
                                    }}
                                >
                                    {text}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Copy Button (Hover) */}
                        <button
                            onClick={handleCopy}
                            className={`absolute top-2 ${sender === 'user' ? '-left-10' : '-right-10'}
                                p-1.5 rounded-lg bg-white shadow-md border border-gray-100 
                                opacity-0 group-hover/bubble:opacity-100 transition-all duration-200
                                text-gray-500 hover:text-gray-700 hover:bg-gray-50`}
                            title="Копировать в буфер"
                        >
                            {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                                <Copy className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
