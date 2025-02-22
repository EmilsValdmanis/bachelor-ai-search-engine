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
import RefrenceLink from "./ui/reference-link";
import "katex/dist/katex.min.css";
import ToolResult from "./tool-result";

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
            <div className="prose-sm prose-neutral border-border w-full rounded-3xl border p-4">
                {(message.parts ?? [])
                    .filter((part) => part.type === "tool-invocation")
                    .map(({ toolInvocation }, index) => {
                        return <ToolResult key={index} tool={toolInvocation} />;
                    })}
                <Markdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[
                        [rehypeExternalLinks, { target: "_blank" }],
                        [rehypeKatex],
                    ]}
                    components={{
                        code({ className, children, ...props }) {
                            return (
                                <CodeBlock
                                    language={
                                        className?.match(
                                            /language-(\w+)/,
                                        )?.[1] || ""
                                    }
                                    value={String(children).replace(/\n$/, "")}
                                    {...props}
                                />
                            );
                        },
                        a({ children, ...props }) {
                            return (
                                <RefrenceLink {...props}>
                                    {children}
                                </RefrenceLink>
                            );
                        },
                    }}
                >
                    {messageContent}
                </Markdown>
                {!isLoading && (
                    <div className="text-muted-foreground flex w-full justify-center text-xs">
                        AI can make mistakes. Verify important info.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatMessage;
