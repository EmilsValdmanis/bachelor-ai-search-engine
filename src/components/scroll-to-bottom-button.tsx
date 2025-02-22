"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function ScrollToBottomButton({
    scrollToBottom,
    showScrollButton,
}: {
    scrollToBottom: () => void;
    showScrollButton: boolean;
}) {
    return (
        <AnimatePresence>
            {showScrollButton && (
                <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => scrollToBottom()}
                    className="bg-muted absolute -top-9 left-1/2 -translate-x-1/2 transform rounded-full p-1 shadow-inner md:-top-11"
                >
                    <ChevronDown />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export default ScrollToBottomButton;
