"use client";

import { useState, useEffect } from "react";
import { Toggle } from "./ui/toggle";
import { getCookie, setCookie } from "@/lib/utils/cookies";
import { Globe } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "./ui/tooltip";
import LogoIcon from "../../public/logo-icon";

function ChatSearchToggle() {
    const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const savedMode = getCookie("is-search-tool-enabled");
        if (savedMode !== null) setIsSearchEnabled(savedMode === "true");
        setIsLoading(false);
    }, []);

    const handleSearchToggle = (pressed: boolean) => {
        setIsSearchEnabled(pressed);
        setCookie("is-search-tool-enabled", pressed.toString());
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        {isLoading ? (
                            <Skeleton className="h-9 w-20.5 rounded-3xl" />
                        ) : (
                            <Toggle
                                pressed={isSearchEnabled}
                                onPressedChange={handleSearchToggle}
                                variant="outline"
                                className="rounded-3xl transition-all data-[state=on]:border-indigo-500 data-[state=on]:bg-indigo-500/20 data-[state=on]:text-indigo-500"
                            >
                                <Globe />
                                <span className="text-xs">Search</span>
                            </Toggle>
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    className="flex items-center text-xs"
                    side="bottom"
                >
                    This will allow Searchly{" "}
                    <LogoIcon className="mx-1 size-3" /> to browse the web
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default ChatSearchToggle;
