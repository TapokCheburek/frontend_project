import { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import AuthForm from './components/auth/AuthForm';
import { ChatProvider } from './app/providers/ChatProvider';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (credentials: string) => {
        if (credentials.trim()) {
            setIsAuthenticated(true);
        }
    };

    return (
        <ChatProvider>
            <div className="min-h-screen bg-brand-bg text-brand-text transition-colors duration-200">
                {!isAuthenticated ? (
                    <AuthForm onLogin={handleLogin} />
                ) : (
                    <AppLayout />
                )}
            </div>
        </ChatProvider>
    );
}

export default App;
