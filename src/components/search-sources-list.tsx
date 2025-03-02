"use client";

import Link from "next/link";
import { useState } from "react";

interface ResultSource {
    title: string;
    score: number;
    content: string;
    url: string;
}

function SearchSourcesList({ results }: { results: ResultSource[] }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowButton = results.length > 4;
    const displayedResults =
        isExpanded || !shouldShowButton ? results : results.slice(0, 3);

    return (
        <div className="flex flex-wrap gap-2">
            {displayedResults.map((result, index) => (
                <Link
                    href={result.url}
                    key={index}
                    target="_blank"
                    className="bg-muted hover:bg-muted/75 w-[calc(50%-0.4rem)] space-y-1 rounded-xl p-2 text-xs transition-colors md:w-[calc(25%-0.4rem)]"
                >
                    <p className="line-clamp-2">
                        {result.title || result.content}
                    </p>
                    <p className="text-muted-foreground line-clamp-1">
                        {result.url}
                    </p>
                </Link>
            ))}
            {shouldShowButton && !isExpanded && (
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="bg-muted flex w-[calc(50%-0.4rem)] cursor-pointer items-center justify-center space-y-1 rounded-xl p-2 text-xs md:w-[calc(25%-0.4rem)]"
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </div>
            )}
        </div>
    );
}

export default SearchSourcesList;
