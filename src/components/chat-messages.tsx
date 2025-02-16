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
    data,
    isLoading,
    chatId,
}: ChatMessagesProps) {
    console.log("Chat id:", chatId);
    console.log("Data:", data);
    console.log("Messages:", messages);
    console.log(isLoading);

    if (!messages.length) return null;

    return (
        <div className="relative mx-auto flex w-full flex-col gap-4 px-4 pt-8 pb-[7.25rem]">
            {messages.map((message) => (
                <div key={message.id}>
                    <ChatMessage message={message} />
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;
