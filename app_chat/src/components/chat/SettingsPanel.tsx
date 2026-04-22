import { useState, useEffect } from 'react';
import { X, RotateCcw, Save, Settings as SettingsIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ChatSettings {
    model: string;
    temperature: number;
    topP: number;
    maxTokens: number;
    systemPrompt: string;
    theme: 'light' | 'dark';
}

const DEFAULT_SETTINGS: ChatSettings = {
    model: 'gemini-1.5-pro',
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 2048,
    systemPrompt: 'Ты полезный AI ассистент.',
    theme: 'light',
};

function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
    const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS);

    const handleReset = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    const handleSave = () => {
        console.log('Настройки сохранены:', settings);
        onClose();
    };

    // Закрытие по нажатию Esc
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-bg shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-brand-border">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-primary/10 rounded-lg">
                                    <SettingsIcon className="w-5 h-5 text-brand-primary" />
                                </div>
                                <h2 className="text-xl font-semibold text-brand-text">Настройки ассистента</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-brand-surface rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-brand-text-dim" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Model Selection */}
                            <section className="space-y-3">
                                <label className="block text-sm font-medium text-brand-text-dim">Модель</label>
                                <select
                                    value={settings.model}
                                    onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-brand-surface border border-brand-border rounded-xl focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all outline-none text-brand-text"
                                >
                                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                                    <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
                                </select>
                                <p className="text-[10px] text-brand-text-dim/60">Выберите модель, которая будет обрабатывать ваши запросы.</p>
                            </section>

                            {/* Sliders Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                {/* Temperature */}
                                <section className="space-y-3">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-brand-text-dim">Temperature</label>
                                        <span className="text-sm font-mono font-bold text-brand-primary">{settings.temperature}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={settings.temperature}
                                        onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                                        className="w-full h-2 bg-brand-surface border border-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
                                    />
                                    <p className="text-[10px] text-brand-text-dim/60 italic">Случайность ответов. 0 — максимально точно, 2 — креативно.</p>
                                </section>

                                {/* Top-P */}
                                <section className="space-y-3">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-brand-text-dim">Top-P</label>
                                        <span className="text-sm font-mono font-bold text-brand-primary">{settings.topP}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={settings.topP}
                                        onChange={(e) => setSettings({ ...settings, topP: parseFloat(e.target.value) })}
                                        className="w-full h-2 bg-brand-surface border border-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
                                    />
                                </section>
                            </div>

                            {/* Max Tokens */}
                            <section className="space-y-3">
                                <label className="block text-sm font-medium text-brand-text-dim">Max Tokens</label>
                                <input
                                    type="number"
                                    value={settings.maxTokens}
                                    onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2.5 bg-brand-surface border border-brand-border rounded-xl focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all outline-none text-brand-text"
                                />
                            </section>

                            {/* System Prompt */}
                            <section className="space-y-3">
                                <label className="block text-sm font-medium text-brand-text-dim">System Prompt</label>
                                <textarea
                                    value={settings.systemPrompt}
                                    onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all outline-none resize-none text-sm leading-relaxed text-brand-text"
                                    placeholder="Инструкции для модели..."
                                />
                            </section>
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-6 border-t border-brand-border grid grid-cols-2 gap-4 bg-brand-bg">
                            <button
                                onClick={handleReset}
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-brand-border rounded-xl text-brand-text-dim font-medium hover:bg-brand-surface transition-all"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Сбросить
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary text-white rounded-xl font-medium hover:opacity-90 shadow-md shadow-brand-primary/20 transition-all active:scale-95"
                            >
                                <Save className="w-4 h-4" />
                                Сохранить
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default SettingsPanel;
