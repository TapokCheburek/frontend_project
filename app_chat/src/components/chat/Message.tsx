import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Copy, Check, User, Bot } from 'lucide-react';
import type { MessageRole } from '../../types/message';

interface MessageProps {
    content: string;
    variant: MessageRole;
    timestamp: string;
    senderName?: string;
}

function Message({ content, variant, timestamp, senderName }: MessageProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const name = senderName || (variant === 'user' ? 'Вы' : 'AI Ассистент');

    return (
        <div className={`flex w-full group ${variant === 'user' ? 'justify-end' : 'justify-start'} mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${variant === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    variant === 'user' ? 'bg-brand-primary' : 'bg-brand-surface border border-brand-border'
                }`}>
                    {variant === 'user' ? (
                        <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    ) : (
                        <Bot className="w-5 h-5 md:w-6 md:h-6 text-brand-text-dim" />
                    )}
                </div>

                {/* Content Area */}
                <div className={`flex flex-col ${variant === 'user' ? 'items-end' : 'items-start'} space-y-1 min-w-0`}>
                    {/* Sender Info */}
                    <div className="flex items-center gap-2 px-1 max-w-full">
                        <span className="text-xs font-medium text-brand-text-dim uppercase tracking-wider truncate">
                            {name}
                        </span>
                        <span className="text-[10px] text-brand-text-dim/60 flex-shrink-0">
                            {timestamp}
                        </span>
                    </div>

                    {/* Message Bubble */}
                    <div className="relative group/bubble max-w-full">
                        <div className={`rounded-2xl px-4 py-3 shadow-sm transition-all min-w-0 break-words ${
                            variant === 'user'
                                ? 'bg-brand-primary text-white rounded-tr-none'
                                : 'bg-brand-bg text-brand-text rounded-tl-none border border-brand-border hover:border-brand-text/20'
                        }`}>
                            <div className={`markdown-content prose-sm max-w-none break-words overflow-hidden ${variant === 'user' ? 'text-white' : 'text-brand-text'}`}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                    components={{
                                        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed font-normal break-words overflow-wrap-anywhere">{children}</p>,
                                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                        em: ({ children }) => <em className="italic">{children}</em>,
                                        ul: ({ children }) => <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>,
                                        li: ({ children }) => <li className="leading-relaxed break-words">{children}</li>,
                                        code: ({ children, className }) => {
                                            const isInline = !className;
                                            return isInline ? (
                                                <code className={`px-1.5 py-0.5 rounded font-mono text-[0.85em] break-all ${variant === 'user' ? 'bg-white/20 text-white' : 'bg-brand-surface text-brand-primary/80'}`}>
                                                    {children}
                                                </code>
                                            ) : (
                                                <pre className="p-3 rounded-lg bg-gray-900 text-gray-100 overflow-x-auto my-2 font-mono text-xs leading-normal max-w-full border border-white/10">
                                                    <code>{children}</code>
                                                </pre>
                                            );
                                        },
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Copy Button (Hover) - Only for Assistant */}
                        {variant === 'assistant' && (
                            <button
                                onClick={handleCopy}
                                className="absolute top-2 -right-10 p-1.5 rounded-lg bg-brand-bg shadow-md border border-brand-border
                                    opacity-0 group-hover/bubble:opacity-100 transition-all duration-200
                                    text-brand-text-dim hover:text-brand-text hover:bg-brand-surface focus:opacity-100 focus:outline-none"
                                title="Копировать в буфер"
                            >
                                {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
