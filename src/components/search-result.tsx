import { ToolInvocation } from "ai";
import React from "react";
import { Search } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import SearchSourcesList from "./search-sources-list";
import SearchImagesList from "./search-images-list";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalizeFirstLetter } from "@/lib/utils";

function SearchResult({ tool }: { tool: ToolInvocation }) {
    // Apparently you can have partial calls if you use streaming with your tool
    // https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-tool-usage#tool-call-streaming
    if (tool.state === "call" || tool.state === "partial-call") {
        return (
            <Accordion type="single" defaultValue="sources" collapsible>
                <AccordionItem value="sources">
                    <AccordionTrigger className="pt-0 text-base">
                        <div className="flex items-center gap-2">
                            <Search className="size-4 animate-pulse" />
                            {capitalizeFirstLetter(tool.args.query)}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Skeleton className="h-32 w-[calc(20%-0.4rem)]" />
                            <Skeleton className="h-32 w-[calc(20%-0.4rem)]" />
                            <Skeleton className="h-32 w-[calc(20%-0.4rem)]" />
                            <Skeleton className="h-32 w-[calc(20%-0.4rem)]" />
                            <Skeleton className="h-32 w-[calc(20%-0.4rem)]" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-16 w-[calc(20%-0.4rem)]" />
                            <Skeleton className="h-16 w-[calc(20%-0.4rem)]" />
                            <Skeleton className="h-16 w-[calc(20%-0.4rem)]" />
                            <Skeleton className="h-16 w-[calc(20%-0.4rem)]" />
                            <Skeleton className="h-16 w-[calc(20%-0.4rem)]" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    return (
        <Accordion type="single" defaultValue="sources" collapsible>
            <AccordionItem value="sources">
                <AccordionTrigger className="pt-0 text-base">
                    <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Search className="size-4" />
                            {tool.result.query}{" "}
                            <span className="text-muted-foreground text-xs">
                                ({tool.result.results.length} results)
                            </span>
                        </div>
                        <span className="text-muted-foreground text-xs">
                            {tool.result.response_time}s
                        </span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    <SearchImagesList images={tool.result.images} />
                    <SearchSourcesList results={tool.result.results} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default SearchResult;
