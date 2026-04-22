import { useState } from 'react';
import { Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Toggle } from '../ui/Toggle';

interface AuthFormProps {
    onLogin: (credentials: string) => void;
}

function AuthForm({ onLogin }: AuthFormProps) {
    const [credentials, setCredentials] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!credentials.trim()) {
            setError('Пожалуйста, введите учетные данные');
            return;
        }

        setError('');
        onLogin(credentials);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4 relative">
            <div className="absolute top-4 right-4">
                <Toggle />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-brand-surface rounded-3xl shadow-2xl border border-brand-border overflow-hidden"
            >
                {/* Декоративная полоса сверху */}
                <div className="h-2 bg-gradient-to-r from-brand-primary to-blue-600" />

                <div className="p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-2xl mb-4">
                            <Lock className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-brand-text mb-2">Авторизация</h1>
                        <p className="text-brand-text-dim text-sm">
                            Введите ваши учетные данные (Base64) для доступа к чату
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brand-text-dim ml-1">
                                Credentials
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-text-dim group-focus-within:text-brand-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={credentials}
                                    onChange={(e) => {
                                        setCredentials(e.target.value);
                                        if (error) setError('');
                                    }}
                                    placeholder="Введите строку..."
                                    className={`
                                        w-full pl-11 pr-12 py-3.5 bg-brand-surface border rounded-2xl outline-none transition-all text-brand-text
                                        ${error ? 'border-red-500 bg-red-500/10 focus:border-red-500 ring-red-500/20' : 'border-brand-border focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10'}
                                    `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-text-dim hover:text-brand-text transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Сообщение об ошибке */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 text-red-500 text-xs mt-2 ml-1"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-4 bg-brand-primary text-white rounded-2xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/25 mt-2 text-lg"
                        >
                            <LogIn className="w-5 h-5" />
                            Войти
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-brand-border text-center">
                        <p className="text-xs text-brand-text-dim">
                            © 2026 AI Studio Chat. Все права защищены.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default AuthForm;
