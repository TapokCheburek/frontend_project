import { MessageSquarePlus, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

function EmptyState() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative mb-6"
            >
                {/* Декоративные элементы */}
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-4 text-blue-400 opacity-50"
                >
                    <Sparkles className="w-8 h-8" />
                </motion.div>

                <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
                    <MessageSquarePlus className="w-12 h-12" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-xs"
            >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Здесь пока пусто</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                    Начните новый диалог, отправив сообщение или выбрав чат из списка слева.
                </p>
            </motion.div>
        </div>
    );
}

export default EmptyState;
