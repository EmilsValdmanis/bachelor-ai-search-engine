"use client";

import { useState } from "react";
import Textarea from "react-textarea-autosize";
import { Message } from "ai";
import { cn } from "@/lib/utils";
import ChatInputFooter from "./chat-input-footer";
import { SparklesCore } from "./ui/sparkles";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import ChatInputSuggestions from "./chat-input-suggestions";
import ScrollToBottomButton from "./scroll-to-bottom-button";
import ChatInputSettings from "./chat-input-settings";

interface ChatInputProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    input: string;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    isLoading: boolean;
    stop: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    append: (message: any) => void;
    query?: string;
    showScrollButton: boolean;
    scrollToBottom: () => void;
}

function ChatInput({
    handleSubmit,
    handleInputChange,
    input,
    messages,
    // setMessages,
    isLoading,
    stop,
    // append,
    // query,
    showScrollButton,
    scrollToBottom,
}: ChatInputProps) {
    const [isComposing, setIsComposing] = useState<boolean>(false);
    const [enterDisabled, setEnterDisabled] = useState<boolean>(false);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const { resolvedTheme } = useTheme();

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
        setEnterDisabled(true);
        setTimeout(() => {
            setEnterDisabled(false);
        }, 300);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isComposing && !enterDisabled) {
                const textarea = e.target as HTMLTextAreaElement;
                textarea.form?.requestSubmit();
            }
        }
    };

    return (
        <div
            className={cn(
                "w-[50rem] max-w-full px-4 md:max-w-[calc(100vw-60px)]",
                messages.length &&
                    "bg-background supports-[backdrop-filter]:bg-background/60 fixed bottom-0 backdrop-blur",
            )}
        >
            <form onSubmit={handleSubmit} className="relative">
                <h1
                    className={cn(
                        "text-foreground/80 relative z-20 mx-auto max-w-7xl pb-10 text-center text-4xl font-semibold md:text-5xl",
                        messages.length && "hidden",
                    )}
                >
                    Search easier with AI
                </h1>
                <ScrollToBottomButton
                    scrollToBottom={scrollToBottom}
                    showScrollButton={showScrollButton}
                />
                <div className="bg-muted/60 border-foreground/20 relative flex w-full flex-col gap-2 rounded-3xl border p-2">
                    <Textarea
                        name="input"
                        maxRows={6}
                        rows={1}
                        value={input}
                        spellCheck={false}
                        onChange={(e) => handleInputChange(e)}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        placeholder={
                            messages.length
                                ? "Ask a follow-up question..."
                                : "Ask anything..."
                        }
                        className="placeholder:text-muted-foreground min-h-12 w-full resize-none border-0 bg-transparent p-3 px-4 text-sm transition-[height] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        onKeyDown={handleKeyDown}
                        onHeightChange={(height) => setHeight(height)}
                        style={{ height }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                    />
                    <ChatInputSettings
                        isLoading={isLoading}
                        input={input}
                        stop={stop}
                    />
                </div>
                <AnimatePresence>
                    {!input && !messages.length && !showSuggestions && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Gradients */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-1/2 bottom-8.5 h-[2px] w-3/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-1/2 bottom-8.5 h-px w-3/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-1/2 bottom-8.5 h-[3px] w-1/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-1/2 bottom-8.5 h-px w-1/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-sky-500 to-transparent"
                            />

                            <SparklesCore
                                background="transparent"
                                minSize={0.4}
                                maxSize={1}
                                particleDensity={1200}
                                className="absolute -bottom-25 h-32 w-full"
                                particleColor={
                                    resolvedTheme === "light"
                                        ? "#000000"
                                        : "#FFFFFF"
                                }
                            />
                            <div className="bg-background absolute h-34 w-full [mask-image:radial-gradient(450px_150px_at_top,transparent_20%,white)]" />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {messages.length === 0 && showSuggestions && !input && (
                        <ChatInputSuggestions
                            onSuggestionClick={(prompt) => {
                                handleInputChange({
                                    target: { value: prompt },
                                } as React.ChangeEvent<HTMLTextAreaElement>);
                            }}
                        />
                    )}
                </AnimatePresence>
                <ChatInputFooter input={input} />
            </form>
        </div>
    );
}

export default ChatInput;
