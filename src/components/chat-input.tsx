"use client";

import React, { useState } from "react";
import Textarea from "react-textarea-autosize";
import { ArrowBigUp } from "lucide-react";
import { toast } from "sonner";

function ChatInput() {
    const [message, setMessage] = useState("");
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message.trim() || isComposing || enterDisabled) return;

        toast.success("Submitted message", {
            description: message,
        });
        setMessage("");
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
        <form onSubmit={handleSubmit}>
            <div className="bg-muted/50 border-input relative flex w-full flex-col gap-2 rounded-3xl border">
                <Textarea
                    maxRows={6}
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    placeholder="Ask anything..."
                    className="placeholder:text-muted-foreground min-h-12 w-full resize-none border-0 bg-transparent px-4 py-3 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="flex w-full justify-between p-2">
                <div>{/* may have something here down the line */}</div>
                {message !== "" && (
                    <div className="text-muted-foreground flex items-center text-xs">
                        <ArrowBigUp className="size-4.5" />
                        <p>
                            <span className="font-bold">+ Enter</span> to add
                            new line
                        </p>
                    </div>
                )}
            </div>
        </form>
    );
}

export default ChatInput;
