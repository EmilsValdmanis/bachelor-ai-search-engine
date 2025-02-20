"use client";

import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { AppWindow } from "lucide-react";
import ProfileMenu from "@/components/profile-menu";
import SidebarCollapse from "@/components/sidebar-collapse";

import LogoIcon from "../../../public/logo-icon";

function AppSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const links = [
        {
            label: "Chat 1",
            href: "#",
            icon: <AppWindow className="size-5 flex-shrink-0" />,
        },
    ];

    return (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} animate={true}>
            <SidebarCollapse />
            <SidebarBody className="justify-between gap-10 overflow-hidden">
                <div className="flex flex-1 flex-col overflow-y-auto p-4">
                    <SidebarLink
                        link={{
                            label: "Searchy",
                            href: "/",
                            icon: (
                                <LogoIcon className="stroke-primary size-5 flex-shrink-0 rounded-full" />
                            ),
                        }}
                    />
                    <div className="mt-8 flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <ProfileMenu />
                </div>
            </SidebarBody>
        </Sidebar>
    );
}

export default AppSidebar;
