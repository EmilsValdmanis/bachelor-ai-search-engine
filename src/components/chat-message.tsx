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
import { useMemo } from "react";
import RelatedQuestions from "./related-questions";

interface ChatMessageProps {
    message: Message;
    isLoading: boolean;
    isLast: boolean;
    onQuerySelect: (query: string) => void;
}

function ChatMessage({
    message,
    isLoading,
    isLast,
    onQuerySelect,
}: ChatMessageProps) {
    const relatedQuestions = useMemo(
        () =>
            message.annotations?.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (annotation: any) => annotation?.type === "related-questions",
            ),
        [message.annotations],
    );

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
            <div className="border-border w-full rounded-3xl border p-4">
                {(message.parts ?? [])
                    .filter((part) => part.type === "tool-invocation")
                    .map(({ toolInvocation }, index) => {
                        return <ToolResult key={index} tool={toolInvocation} />;
                    })}
                <Markdown
                    className="prose-sm prose-neutral"
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[
                        [rehypeExternalLinks, { target: "_blank" }],
                        // TODO: Only add katex if message contains Latex
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
                {/* TODO: show this after answer has been generated not after the related questions have been generated */}
                {!isLoading && (
                    // TODO: add copy and regenerate buttons
                    <div className="text-muted-foreground mt-2 flex w-full justify-center text-xs md:justify-end">
                        AI can make mistakes. Verify important info.
                    </div>
                )}
                {relatedQuestions && relatedQuestions.length > 0 && (
                    <RelatedQuestions
                        relatedQuestions={relatedQuestions}
                        onQuerySelect={onQuerySelect}
                    />
                )}
            </div>
        </div>
    );
}

export default ChatMessage;
