import { ImageOff } from "lucide-react";

export default function PlaceholderImage() {
    return (
        <div className="bg-muted flex h-full w-full items-center justify-center rounded-xl">
            <ImageOff className="text-muted-foreground size-8" />
        </div>
    );
}
