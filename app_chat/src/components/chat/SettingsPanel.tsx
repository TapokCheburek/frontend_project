import { useState, useEffect } from 'react';
import { X, Sun, Moon, RotateCcw, Save, Settings as SettingsIcon } from 'lucide-react';
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
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <SettingsIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Настройки ассистента</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Model Selection */}
                            <section className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Модель</label>
                                <select
                                    value={settings.model}
                                    onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-gray-800"
                                >
                                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                                    <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
                                </select>
                                <p className="text-[10px] text-gray-400">Выберите модель, которая будет обрабатывать ваши запросы.</p>
                            </section>

                            {/* Sliders Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                {/* Temperature */}
                                <section className="space-y-3">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-gray-700">Temperature</label>
                                        <span className="text-sm font-mono font-bold text-blue-600">{settings.temperature}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={settings.temperature}
                                        onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <p className="text-[10px] text-gray-400 italic">Случайность ответов. 0 — максимально точно, 2 — креативно.</p>
                                </section>

                                {/* Top-P */}
                                <section className="space-y-3">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-gray-700">Top-P</label>
                                        <span className="text-sm font-mono font-bold text-blue-600">{settings.topP}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={settings.topP}
                                        onChange={(e) => setSettings({ ...settings, topP: parseFloat(e.target.value) })}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </section>
                            </div>

                            {/* Max Tokens */}
                            <section className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
                                <input
                                    type="number"
                                    value={settings.maxTokens}
                                    onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                />
                            </section>

                            {/* System Prompt */}
                            <section className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">System Prompt</label>
                                <textarea
                                    value={settings.systemPrompt}
                                    onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none text-sm leading-relaxed"
                                    placeholder="Инструкции для модели..."
                                />
                            </section>

                            {/* Theme Toggle */}
                            <section className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-700">Тема оформления</span>
                                    <span className="text-xs text-gray-400">{settings.theme === 'light' ? 'Светлая' : 'Темная'}</span>
                                </div>
                                <button
                                    onClick={() => setSettings({ ...settings, theme: settings.theme === 'light' ? 'dark' : 'light' })}
                                    className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 transition-colors focus:outline-none"
                                >
                                    <div
                                        className={`
                                            transform transition-transform duration-300 ease-in-out
                                            flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-sm
                                            ${settings.theme === 'dark' ? 'translate-x-7 bg-blue-600' : 'translate-x-1'}
                                        `}
                                    >
                                        {settings.theme === 'light' ? (
                                            <Sun className="w-3.5 h-3.5 text-orange-400" />
                                        ) : (
                                            <Moon className="w-3.5 h-3.5 text-white" />
                                        )}
                                    </div>
                                </button>
                            </section>
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-6 border-t border-gray-100 grid grid-cols-2 gap-4 bg-white">
                            <button
                                onClick={handleReset}
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-all"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Сбросить
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
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
