"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster"
            toastOptions={{
                classNames: {
                    toast: "",
                    description: "",
                    actionButton: "",
                    cancelButton: "",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
