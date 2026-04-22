import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Toggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-brand-surface border border-brand-border text-brand-text shadow-xl hover:bg-brand-bg hover:scale-105 active:scale-95 transition-all"
            aria-label="Переключить тему"
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5 text-brand-primary" />
            ) : (
                <Sun className="w-5 h-5 text-brand-primary" />
            )}
        </button>
    );
}
