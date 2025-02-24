"use client";

import { useState } from "react";
import { LinkPreview } from "./ui/link-preview";

interface ResultSource {
    title: string;
    score: number;
    content: string;
    url: string;
}

function SearchSourcesList({ results }: { results: ResultSource[] }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowButton = results.length > 5;
    const displayedResults =
        isExpanded || !shouldShowButton ? results : results.slice(0, 4);

    return (
        <div className="flex flex-wrap gap-2">
            {displayedResults.map((result, index) => (
                <LinkPreview
                    url={result.url}
                    key={index}
                    className="bg-muted w-[calc(20%-0.4rem)] space-y-1 rounded-xl p-2 text-xs"
                >
                    <p className="line-clamp-2">
                        {result.title || result.content}
                    </p>
                    <p className="text-muted-foreground line-clamp-1">
                        {result.url}
                    </p>
                </LinkPreview>
            ))}
            {shouldShowButton && !isExpanded && (
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="bg-muted flex w-[calc(20%-0.4rem)] cursor-pointer items-center justify-center space-y-1 rounded-xl p-2 text-xs"
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </div>
            )}
        </div>
    );
}

export default SearchSourcesList;
