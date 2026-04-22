import { AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
    if (!message) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm"
        >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{message}</span>
        </motion.div>
    );
}

export default ErrorMessage;
