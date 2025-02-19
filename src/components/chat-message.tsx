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
}: {
    message: Message;
    isLoading: boolean;
}) {
    if (message.role === "user") return <UserMessage message={message} />;

    const containsLatex = containsLaTeX(message.content);

    const messageContent = containsLatex
        ? processLatex(message.content)
        : message.content;

    return (
        <div className="flex gap-2">
            <LogoIcon className={cn("mt-4", isLoading && "animate-spin")} />
            <div
                className={cn(
                    "border-border w-full max-w-full rounded-3xl border p-4",
                )}
            >
                <Markdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[
                        [rehypeExternalLinks, { target: "_blank" }],
                        [rehypeKatex],
                    ]}
                    className="prose-sm prose-neutral"
                    components={{
                        code({ inline, className, children, ...props }) {
                            if (children.length) {
                                if (children[0] == "▍") {
                                    return (
                                        <span className="mt-1 animate-pulse cursor-default">
                                            ▍
                                        </span>
                                    );
                                }

                                children[0] = (children[0] as string).replace(
                                    "`▍`",
                                    "▍",
                                );
                            }

                            const match = /language-(\w+)/.exec(
                                className || "",
                            );

                            if (inline) {
                                return (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }

                            return (
                                <CodeBlock
                                    key={Math.random()}
                                    language={(match && match[1]) || ""}
                                    value={String(children).replace(/\n$/, "")}
                                    {...props}
                                />
                            );
                        },
                        //TODO: Make a component for links?
                    }}
                >
                    {messageContent}
                </Markdown>
            </div>
        </div>
    );
}

export default ChatMessage;
