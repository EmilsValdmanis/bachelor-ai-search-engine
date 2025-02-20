"use client";

import { useSidebar } from "./ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { motion } from "motion/react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

function ProfileMenu() {
    const { open, animate } = useSidebar();
    const { user, isLoaded } = useUser();

    return (
        <div className="flex items-center gap-2">
            {isLoaded ? (
                <UserButton />
            ) : (
                <Skeleton className="size-7 rounded-full" />
            )}
            <motion.span
                animate={{
                    display: animate
                        ? open
                            ? "inline-block"
                            : "none"
                        : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-primary !m-0 inline-block !p-0 text-sm whitespace-pre transition duration-150 group-hover/sidebar:translate-x-1"
            >
                {isLoaded ? user?.fullName : <Skeleton className="h-5 w-36" />}
            </motion.span>
        </div>
    );
}

export default ProfileMenu;
