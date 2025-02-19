import { Message, JSONValue } from "ai";
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
                <div key={message.id}>
                    <ChatMessage message={message} isLoading={isLoading} />
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;
