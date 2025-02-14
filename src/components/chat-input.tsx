"use client";

import React, { useState } from "react";
import Textarea from "react-textarea-autosize";
import { ArrowBigUp } from "lucide-react";
import { Message } from "ai";
import { cn } from "@/lib/utils";

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
}

function ChatInput({
    handleSubmit,
    handleInputChange,
    input,
    messages,
    // setMessages,
    // isLoading,
    // stop,
    // append,
    // query,
}: ChatInputProps) {
    const [isComposing, setIsComposing] = useState<boolean>(false);
    const [enterDisabled, setEnterDisabled] = useState<boolean>(false);

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

    console.log(input);

    return (
        <div
            className={cn(
                "w-[50rem] max-w-full",
                messages.length &&
                    "bg-background supports-[backdrop-filter]:bg-background/60 fixed bottom-0 backdrop-blur",
            )}
        >
            <form onSubmit={handleSubmit}>
                <div className="bg-muted/60 border-foreground/20 relative flex w-full flex-col gap-2 rounded-3xl border">
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
                        className="placeholder:text-muted-foreground min-h-12 w-full resize-none border-0 bg-transparent px-4 py-3 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex h-[2.125rem] w-full justify-between p-2">
                    <div>{/* may have something here down the line */}</div>
                    {input.replace(/\n/g, "") !== "" && (
                        <div className="text-muted-foreground flex items-center text-xs">
                            <ArrowBigUp className="size-4.5" />
                            <p>
                                <span className="font-bold">+ Enter</span> to
                                add new line
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ChatInput;
