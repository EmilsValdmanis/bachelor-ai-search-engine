// import { generateText } from "ai";
// import { registry } from "@/utils/registry";
import { Message, JSONValue } from "ai";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
    messages: Message[];
    data: JSONValue[] | undefined;
    isLoading: boolean;
    chatId?: string;
}

// const { text } = await generateText({
//     model: registry.languageModel("openai:gpt-4o-mini"),
//     prompt: "Explain a tradition of Latvians that you find interesting",
// });

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
        <div className="relative mx-auto w-full px-4 pt-[2.125rem] pb-[7.375rem]">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={cn(
                        "border-border m-4 w-fit max-w-[40rem] rounded-3xl border p-4",
                        message.role === "user"
                            ? "bg-muted justify-self-end border-none"
                            : "",
                    )}
                >
                    <p>{message.content}</p>
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;
