import { motion } from "motion/react";
import { ArrowUp, Square } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import ChatSearchToggle from "./chat-search-toggle";

interface ChatInputSettingsProps {
    isLoading: boolean;
    input: string;
    stop: () => void;
}

function ChatInputSettings({ isLoading, input, stop }: ChatInputSettingsProps) {
    const isDisabled = !isLoading && input.length === 0;

    return (
        <div className="flex items-center justify-between p-1">
            <ChatSearchToggle />
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: isDisabled ? 0.5 : 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                    buttonVariants({
                        size: "icon",
                        variant: "outline",
                    }),
                    "rounded-full opacity-50",
                    isLoading && "animate-pulse",
                )}
                type={isLoading ? "button" : "submit"}
                disabled={!isLoading && input.length === 0}
                onClick={isLoading ? stop : undefined}
            >
                {isLoading ? (
                    <Square className="fill-foreground stroke-foreground size-5 stroke-3" />
                ) : (
                    <ArrowUp className="size-5 stroke-3" />
                )}
            </motion.button>
        </div>
    );
}

export default ChatInputSettings;
