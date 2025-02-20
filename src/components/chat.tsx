"use client";

import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

function Chat({ id, query }: { id: string; query?: string }) {
    const { isSignedIn } = useAuth();
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

        if (!isSignedIn) {
            return toast.info("Must be signed in first!");
        }

        setData(undefined);
        handleSubmit(e);
    };

    return (
        <div
            className={cn(
                "stretch mx-auto flex h-full w-full max-w-[50rem] grow flex-col gap-10",
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
