/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";

interface ResultImage {
    url: string;
    description: string;
}

function SearchImagesList({ images }: { images: ResultImage[] }) {
    if (!images || images.length === 0) {
        return <p className="text-muted-foreground">No images found.</p>;
    }

    const displayedImages = images.slice(0, 5);

    // TODO: make this a carousel/lightbox without scroll until then just show 4 images
    return (
        <div className="flex gap-2">
            {displayedImages.map(({ url, description }, index: number) => (
                <ImageWithFallback
                    key={index}
                    url={url}
                    description={description}
                />
            ))}
        </div>
    );
}

function ImageWithFallback({
    url,
    description,
}: {
    url: string;
    description: string;
}) {
    const [isVisble, setIsVisible] = useState(true);

    if (!isVisble) return null;

    return (
        <div className="overflow bg-background h-32 w-[calc(50%-0.4rem)] flex-shrink-0 shadow-md transition-transform hover:scale-95 hover:rotate-y-1 hover:rotate-z-1 hover:transform-3d md:w-[calc(25%-0.4rem)]">
            <Link href={url} target="_blank">
                <img
                    alt={description}
                    src={url}
                    className="h-full w-full rounded-xl object-cover"
                    onError={() => setIsVisible(false)}
                />
            </Link>
        </div>
    );
}

export default SearchImagesList;
