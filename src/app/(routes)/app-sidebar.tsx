"use client";

import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { AppWindow } from "lucide-react";
import { motion } from "motion/react";
import { SignedIn, UserButton } from "@clerk/nextjs";

import LogoIcon from "../../../public/logo-icon";

function AppSidebar() {
    const [open, setOpen] = useState(false);

    const links = [
        {
            label: "Chat 1",
            href: "#",
            icon: <AppWindow className="size-5 flex-shrink-0" />,
        },
    ];

    return (
        <SignedIn>
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <>
                            <Logo />
                        </>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <UserButton />
                    </div>
                </SidebarBody>
            </Sidebar>
        </SignedIn>
    );
}

export default AppSidebar;

export const Logo = () => {
    return (
        <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <LogoIcon className="stroke-primary size-5 flex-shrink-0 rounded-full" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary font-medium whitespace-pre"
            >
                Searchy
            </motion.span>
        </Link>
    );
};
