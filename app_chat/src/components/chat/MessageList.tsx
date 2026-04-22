import { useEffect, useRef } from 'react';
import Message from './Message';
import EmptyState from '../ui/EmptyState';
import TypingIndicator from './TypingIndicator';
import type { Message as MessageType } from '../../types/MessageType';

interface MessageListProps {
    messages: MessageType[];
    isLoading?: boolean;
}

function MessageList({ messages, isLoading }: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    if (messages.length === 0 && !isLoading) {
        return <EmptyState />;
    }

    return (
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 bg-brand-surface/30 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
                {messages.map((msg) => (
                    <Message
                        key={msg.id}
                        content={msg.content}
                        variant={msg.role}
                        timestamp={msg.timestamp}
                    />
                ))}

                <TypingIndicator isVisible={isLoading} />
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default MessageList;
