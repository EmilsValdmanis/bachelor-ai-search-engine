import { Message } from "ai";
import { Fragment } from "react";
import ChatMessage from "./chat-message";

interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
    onQuerySelect: (query: string) => void;
}

function ChatMessages({
    messages,
    isLoading,
    onQuerySelect,
}: ChatMessagesProps) {
    if (!messages.length) return null;

    return (
        <div className="relative mx-auto flex w-full flex-col gap-4 px-8 pt-8 pb-[11.5rem]">
            {messages.map((message) => (
                <Fragment key={message.id}>
                    <ChatMessage
                        message={message}
                        isLoading={isLoading}
                        isLast={message.id === messages[messages.length - 1].id}
                        onQuerySelect={onQuerySelect}
                    />
                </Fragment>
            ))}
        </div>
    );
}

export default ChatMessages;
