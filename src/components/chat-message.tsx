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

import "katex/dist/katex.min.css";

function ChatMessage({ message }: { message: Message }) {
    if (message.role === "user") return <UserMessage message={message} />;

    const containsLatex = containsLaTeX(message.content);

    const messageContent = containsLatex
        ? processLatex(message.content)
        : message.content;

    return (
        <div className="flex gap-2">
            <LogoIcon className="mt-4" />
            <div
                className={cn(
                    "border-border w-fit max-w-[40rem] rounded-3xl border p-4",
                )}
            >
                <Markdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[
                        [rehypeExternalLinks, { target: "_blank" }],
                        [rehypeKatex],
                    ]}
                    className="prose-sm prose-neutral"
                    //TODO: add code block component to render <code> tags more nicely
                >
                    {messageContent}
                </Markdown>
            </div>
        </div>
    );
}

export default ChatMessage;
