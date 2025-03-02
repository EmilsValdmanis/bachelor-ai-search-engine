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
                            <Skeleton className="h-32 w-[calc(50%-0.4rem)] md:w-[calc(25%-0.4rem)]" />
                            <Skeleton className="h-32 w-[calc(50%-0.4rem)] md:w-[calc(25%-0.4rem)]" />
                            <Skeleton className="h-32 w-[calc(50%-0.4rem)] md:w-[calc(25%-0.4rem)]" />
                            <Skeleton className="h-32 w-[calc(50%-0.4rem)] md:w-[calc(25%-0.4rem)]" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-16 w-[calc(50%-0.4rem)] md:w-[calc(25%-0.4rem)]" />
                            <Skeleton className="h-16 w-[calc(50%-0.4rem)] md:w-[calc(25%-0.4rem)]" />
                            <Skeleton className="h-16 w-[calc(50%-0.4rem)] md:w-[calc(25%-0.4rem)]" />
                            <Skeleton className="h-16 w-[calc(50%-0.4rem)] md:w-[calc(25%-0.4rem)]" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    // TODO: fix the mobile issues
    return (
        <Accordion type="single" defaultValue="sources" collapsible>
            <AccordionItem value="sources">
                <AccordionTrigger className="pt-0 text-base">
                    <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex w-full flex-col items-start gap-1 text-nowrap md:flex-row md:items-center md:gap-2">
                            <div className="flex items-center gap-2">
                                <Search className="size-4 min-h-4 min-w-4" />
                                {capitalizeFirstLetter(tool.result.query)}{" "}
                            </div>
                            <div className="flex w-full grow items-center justify-between gap-2">
                                <span className="text-muted-foreground text-xs">
                                    ({tool.result.results.length} results)
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    {tool.result.response_time}s
                                </span>
                            </div>
                        </div>
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
