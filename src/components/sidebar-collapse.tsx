"use client";

import { Button } from "./ui/button";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { motion } from "motion/react";
import { setCookie, getCookie } from "@/lib/utils/cookies";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

function SidebarCollapse() {
    const { open, alwaysOpen, setAlwaysOpen } = useSidebar();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentMode = getCookie("sidebar-always-open");
        if (currentMode !== null) {
            setAlwaysOpen(currentMode === "true");
        }
        setIsLoading(false);
    }, [setAlwaysOpen]);

    const handleAlwaysOpenChange = () => {
        setAlwaysOpen((prev) => {
            const newAlwaysOpen = !prev;
            setCookie("sidebar-always-open", newAlwaysOpen.toString());
            return newAlwaysOpen;
        });
    };

    return (
        <motion.div
            initial={{ left: "16.625rem" }}
            animate={{ left: open ? "16.625rem" : "4.75rem" }}
            className="absolute top-4 hidden md:block"
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={handleAlwaysOpenChange}
            >
                {isLoading ? (
                    <Skeleton className="size-9" />
                ) : alwaysOpen ? (
                    <ArrowLeftToLine />
                ) : (
                    <ArrowRightToLine />
                )}
            </Button>
        </motion.div>
    );
}

export default SidebarCollapse;
