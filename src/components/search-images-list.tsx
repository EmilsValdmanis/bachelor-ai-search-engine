/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import PlaceholderImage from "../../public/placeholder-image";

interface ResultImage {
    url: string;
    description: string;
}

function SearchImagesList({ images }: { images: ResultImage[] }) {
    if (!images || images.length === 0) {
        return <p className="text-muted-foreground">No images found.</p>;
    }

    const displayedImages = images.slice(0, 5);

    // TODO: make this a carousel/lightbox without scroll until then just show 5 images
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
    const [hasError, setHasError] = useState(false);

    return (
        <div className="bg-muted h-32 w-[calc(20%-0.4rem)] flex-shrink-0 overflow-hidden rounded-xl shadow-md">
            {hasError ? (
                <PlaceholderImage />
            ) : (
                <img
                    alt={description}
                    src={url}
                    className="h-full w-full object-cover"
                    onError={() => setHasError(true)}
                />
            )}
        </div>
    );
}

export default SearchImagesList;
