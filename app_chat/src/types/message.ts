export type MessageRole = 'user' | 'assistant';

export interface MessageData {
    id: string;
    content: string;
    role: MessageRole;
    timestamp: string;
}
