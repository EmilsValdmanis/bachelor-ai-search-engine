import { Message, JSONValue } from "ai";
import { Fragment } from "react";
import ChatMessage from "./chat-message";

interface ChatMessagesProps {
    messages: Message[];
    data: JSONValue[] | undefined;
    isLoading: boolean;
    chatId?: string;
}

function ChatMessages({
    messages,
    // data,
    isLoading,
    // chatId,
}: ChatMessagesProps) {
    if (!messages.length) return null;

    return (
        <div className="relative mx-auto flex w-full flex-col gap-4 px-8 pt-8 pb-[7.25rem]">
            {messages.map((message) => (
                <Fragment key={message.id}>
                    <ChatMessage
                        message={message}
                        isLoading={isLoading}
                        isLast={message.id === messages[messages.length - 1].id}
                    />
                </Fragment>
            ))}
        </div>
    );
}

export default ChatMessages;
