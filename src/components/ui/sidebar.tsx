"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "./button";

interface Links {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
    alwaysOpen: boolean;
    setAlwaysOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
    undefined,
);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    setAlwaysOpen: setAlwaysOpenProp,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    alwaysOpen?: boolean;
    setAlwaysOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);
    const [alwaysOpen, setAlwaysOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const open = isMobile
        ? openState
        : alwaysOpen
          ? true
          : openProp !== undefined
            ? openProp
            : openState;

    const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
        if (isMobile) {
            setOpenState(value instanceof Function ? value(openState) : value);
        } else if (setOpenProp) {
            setOpenProp(value);
        }
    };

    const setAlwaysOpenFunc =
        setAlwaysOpenProp !== undefined ? setAlwaysOpenProp : setAlwaysOpen;

    return (
        <SidebarContext.Provider
            value={{
                open,
                setOpen,
                alwaysOpen,
                setAlwaysOpen: setAlwaysOpenFunc,
                animate: animate,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...(props as React.ComponentProps<"div">)} />
        </>
    );
};

export const DesktopSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebar();
    return (
        <>
            <motion.div
                className={cn(
                    "hidden h-full w-[250px] flex-shrink-0 md:flex md:flex-col",
                    className,
                )}
                animate={{
                    width: animate ? (open ? "250px" : "60px") : "250px",
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                {...props}
            >
                {children}
            </motion.div>
        </>
    );
};

export const MobileSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) => {
    const { open, setOpen } = useSidebar();
    return (
        <>
            <div
                className={cn(
                    "bg-background flex h-12 w-full flex-row items-center justify-between px-4 py-4 md:hidden",
                )}
                {...props}
            >
                <div className="z-20 flex w-full justify-start">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(!open)}
                    >
                        <Menu className="fill-primary !size-5" />
                    </Button>
                </div>
                <AnimatePresence>
                    {open && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-background/60 fixed inset-0 z-50"
                                onClick={() => setOpen(!open)}
                            />
                            <motion.div
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "-100%", opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                                className={cn(
                                    "bg-background supports-[backdrop-filter]:bg-background/60 fixed inset-0 z-[100] flex h-full w-4/5 flex-col justify-between border p-10 backdrop-blur",
                                    className,
                                )}
                            >
                                <div
                                    className="text-primary absolute top-10 right-10 z-50"
                                    onClick={() => setOpen(!open)}
                                >
                                    <X />
                                </div>
                                {children}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export const SidebarLink = ({
    link,
    className,
    ...props
}: {
    link: Links;
    className?: string;
    props?: LinkProps;
}) => {
    const { open, animate } = useSidebar();
    return (
        <Link
            href={link.href}
            className={cn(
                "group/sidebar flex items-center justify-start gap-2 py-2",
                className,
            )}
            {...props}
        >
            {link.icon}

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
                {link.label}
            </motion.span>
        </Link>
    );
};
