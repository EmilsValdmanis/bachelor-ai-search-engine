import { ToolInvocation } from "ai";
import React from "react";
import { Search } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

function SearchResult({ tool }: { tool: ToolInvocation }) {
    console.log(tool);

    // Apparently you can have partial calls if you use streaming with your tool
    // https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-tool-usage#tool-call-streaming
    if (tool.state === "call" || tool.state === "partial-call") {
        return (
            <div className="flex w-full flex-col gap-4">
                <div className="flex w-fit items-center gap-2 px-2 capitalize">
                    <Search className="size-4 animate-pulse" />

                    {tool.args.query}
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </div>
        );
    }

    // TODO: display tool.result.images and tool.result.results

    return (
        <div className="flex w-full items-center gap-2 capitalize">
            <Search className="size-4" />
            {tool.result.query}
        </div>
    );
}

export default SearchResult;
