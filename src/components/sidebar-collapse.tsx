"use client";

import { Button } from "./ui/button";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { motion } from "motion/react";

function SidebarCollapse() {
    const { open, alwaysOpen, setAlwaysOpen } = useSidebar();

    return (
        <motion.div
            initial={{ left: "16.625rem" }}
            animate={{ left: open ? "16.625rem" : "4.75rem" }}
            className="absolute top-4 hidden md:block"
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setAlwaysOpen((prev) => !prev)}
            >
                {alwaysOpen ? <ArrowLeftToLine /> : <ArrowRightToLine />}
            </Button>
        </motion.div>
    );
}

export default SidebarCollapse;
