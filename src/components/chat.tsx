"use client";

import React from "react";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function Chat({ id, query }: { id: string; query?: string }) {
    const {
        handleSubmit,
        handleInputChange,
        input,
        messages,
        setMessages,
        isLoading,
        data,
        setData,
        stop,
        append,
    } = useChat({
        initialMessages: [],
        id: "1",
        onError: (error) => {
            console.error("Error in chat:", error);
            toast.error(`Error in chat: ${error.message}`);
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData(undefined);
        handleSubmit(e);
    };

    return (
        <div
            className={cn(
                "stretch mx-auto flex h-screen w-full max-w-[50rem] flex-col gap-10",
                !messages.length && "justify-center",
            )}
        >
            <ChatMessages
                messages={messages}
                data={data}
                isLoading={isLoading}
                chatId={id}
            />
            <ChatInput
                handleSubmit={onSubmit}
                handleInputChange={handleInputChange}
                input={input}
                messages={messages}
                setMessages={setMessages}
                isLoading={isLoading}
                stop={stop}
                append={append}
                query={query}
            />
        </div>
    );
}

export default Chat;
