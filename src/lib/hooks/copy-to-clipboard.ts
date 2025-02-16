"use client";

import { useState } from "react";

export const useCopyToClipboard = ({
    copyTimeout = 2500,
}: {
    copyTimeout?: number;
}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copyToClipboard = (value: string) => {
        if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
            return;
        }
        if (!value) return;

        navigator.clipboard.writeText(value).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, copyTimeout);
        });
    };

    return { isCopied, copyToClipboard };
};
