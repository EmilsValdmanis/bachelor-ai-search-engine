import React from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

const suggestions = [
    "What are the biggest tech trends of 2025?",
    "What's the latest in space exploration?",
    "How will AI impact jobs in the next five years?",
    "What are the best travel destinations for 2025?",
];

function ChatInputSuggestions({
    onSuggestionClick,
}: {
    onSuggestionClick: (prompt: string) => void;
}) {
    return (
        <div className="absolute bottom-[2.125rem] grid translate-y-full transform gap-3 py-3">
            {suggestions.map((suggestion, index) => (
                <motion.button
                    key={index}
                    onClick={async () => {
                        onSuggestionClick(suggestion);
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.01, x: 10, opacity: 0.5 }}
                    transition={{
                        delay: index * 0.05,
                    }}
                    className="flex items-center gap-2 hover:cursor-pointer"
                >
                    <ChevronRight className="size-4" />
                    {suggestion}
                </motion.button>
            ))}
        </div>
    );
}

export default ChatInputSuggestions;
