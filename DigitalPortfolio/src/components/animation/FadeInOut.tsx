import { motion, AnimatePresence } from "framer-motion";

interface FadeInOutProps {
    isVisible: boolean;
    children: React.ReactNode;
}

export default function FadeInOut({ isVisible, children }: FadeInOutProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}