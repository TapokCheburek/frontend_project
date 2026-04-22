import Message from './Message';

interface MessageData {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: string;
}

const MOCK_MESSAGES: MessageData[] = [
    {
        id: '1',
        text: 'Привет! Покажи пример **жирного текста**, *курсива* и какого-нибудь кода на JavaScript.',
        sender: 'user',
        timestamp: '10:00',
    },
    {
        id: '2',
        text: 'Конечно! Вот основные элементы форматирования:\n\n' +
            '1. **Жирный текст** для акцентов\n' +
            '2. *Курсив* для примечаний\n' +
            '3. Списки (как этот)\n\n' +
            'А вот и пример блока кода:\n' +
            '```javascript\n' +
            'function helloWorld() {\n' +
            '  console.log("Hello, AI Studio!");\n' +
            '}\n' +
            '```',
        sender: 'assistant',
        timestamp: '10:01',
    }
];

function MessageList() {
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
            <div className="max-w-4xl mx-auto">
                {MOCK_MESSAGES.map((msg) => (
                    <Message
                        key={msg.id}
                        text={msg.text}
                        sender={msg.sender}
                        timestamp={msg.timestamp}
                    />
                ))}
            </div>
        </div>
    );
}

export default MessageList;
