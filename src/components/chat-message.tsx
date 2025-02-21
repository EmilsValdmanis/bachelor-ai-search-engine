import { cn } from "@/lib/utils";
import { Message } from "ai";
import UserMessage from "./user-message";
import LogoIcon from "../../public/logo-icon";
import Markdown from "./ui/markdown";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { containsLaTeX, processLatex } from "@/lib/utils/latex";
import CodeBlock from "./ui/code-block";

import "katex/dist/katex.min.css";

function ChatMessage({
    message,
    isLoading,
    isLast,
}: {
    message: Message;
    isLoading: boolean;
    isLast: boolean;
}) {
    if (message.role === "user") return <UserMessage message={message} />;

    const containsLatex = containsLaTeX(message.content);

    const messageContent = containsLatex
        ? processLatex(message.content)
        : message.content;

    // TODO: make a loading visual for when the chat is searching the web.

    return (
        <div className="flex gap-2">
            <div className="mt-4 size-6">
                <LogoIcon
                    className={cn(
                        "size-6",
                        isLoading && isLast && "animate-spin",
                    )}
                />
            </div>
            <Markdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[
                    [rehypeExternalLinks, { target: "_blank" }],
                    [rehypeKatex],
                ]}
                className="prose-sm prose-neutral border-border rounded-3xl border p-4"
                components={{
                    code({ className, children, ...props }) {
                        return (
                            <CodeBlock
                                language={
                                    className?.match(/language-(\w+)/)?.[1] ||
                                    ""
                                }
                                value={String(children).replace(/\n$/, "")}
                                {...props}
                            />
                        );
                    },
                    // TODO: Make a component for links
                }}
            >
                {messageContent}
            </Markdown>
        </div>
    );
}

export default ChatMessage;
