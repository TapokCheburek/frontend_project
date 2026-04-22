import { Bot } from 'lucide-react';
import { motion } from 'motion/react';

interface TypingIndicatorProps {
    isVisible?: boolean;
}

function TypingIndicator({ isVisible = true }: TypingIndicatorProps) {
    if (!isVisible) return null;

    return (
        <div className="flex w-full justify-start mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex gap-3 max-w-[85%] md:max-w-[75%]">
                {/* Avatar */}
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-gray-200">
                    <Bot className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                </div>

                {/* Content Area */}
                <div className="flex flex-col items-start space-y-1">
                    {/* Sender Info */}
                    <div className="flex items-center gap-2 px-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              AI Ассистент печатает
            </span>
                    </div>

                    {/* Bubble */}
                    <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100 px-4 py-3 shadow-sm">
                        <div className="flex gap-1.5 items-center h-5">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.4, 1, 0.4],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                    className="w-2 h-2 bg-blue-500 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TypingIndicator;
