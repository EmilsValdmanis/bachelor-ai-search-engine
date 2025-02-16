import { cn } from "@/lib/utils";
import { BotMessageSquare } from "lucide-react";

const LogoIcon = ({ className }: { className?: string }) => {
    return <BotMessageSquare className={cn("", className)} />;
};

export default LogoIcon;
