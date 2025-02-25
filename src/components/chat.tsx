"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

const SCROLL_TO_BOTTOM_THRESHOLD = 100;

function Chat({ id, query }: { id: string; query?: string }) {
    const { isSignedIn } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
        null,
    );

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

    const chatRef = (node: HTMLDivElement | null) => {
        if (node) {
            const parentElement = node.parentElement;
            if (parentElement && parentElement !== scrollContainer) {
                setScrollContainer(parentElement);
            }
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const checkScrollPosition = useCallback(() => {
        if (!scrollContainer) return;

        const isAtBottom =
            Math.abs(
                scrollContainer.scrollHeight -
                    scrollContainer.scrollTop -
                    scrollContainer.clientHeight,
            ) < SCROLL_TO_BOTTOM_THRESHOLD;

        setShowScrollButton(!isAtBottom);
    }, [scrollContainer]);

    useEffect(() => {
        if (!scrollContainer) return;

        scrollContainer.addEventListener("scroll", checkScrollPosition);
        checkScrollPosition();

        return () => {
            scrollContainer.removeEventListener("scroll", checkScrollPosition);
        };
    }, [checkScrollPosition, scrollContainer]);

    useEffect(() => {
        checkScrollPosition();
    }, [checkScrollPosition, messages]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isSignedIn) {
            handleInputChange({
                target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            return toast.info("Must be signed in first!");
        }

        if (isLoading) return;

        setData(undefined);
        handleSubmit(e);
    };

    return (
        <div
            ref={chatRef}
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
            <div ref={messagesEndRef} />
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
                showScrollButton={showScrollButton}
                scrollToBottom={scrollToBottom}
            />
        </div>
    );
}

export default Chat;
