import React from "react";
import { ArrowBigUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const motionVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

function ChatInputFooter({ input }: { input: string }) {
    return (
        <div className="text-muted-foreground flex h-[2.125rem] w-full justify-center p-2 text-xs text-nowrap md:justify-between">
            <AnimatePresence>
                {input.replace(/\n/g, "") !== "" && (
                    <>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={motionVariants}
                        >
                            AI can make mistakes. Verify important info
                        </motion.p>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={motionVariants}
                            className="hidden items-center md:flex"
                        >
                            <ArrowBigUp className="size-4.5" />
                            <p>
                                <span className="font-bold">+ Enter</span> to
                                add new line
                            </p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ChatInputFooter;
