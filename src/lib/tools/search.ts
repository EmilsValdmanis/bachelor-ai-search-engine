import { SearchResultImage, SearchResults } from "../types";

export async function fetchTavilySearch(
    query: string,
    maxResults: number = 10,
    searchDepth: "basic" | "advanced" = "basic",
    includeDomains: string[] = [],
    excludeDomains: string[] = [],
): Promise<SearchResults> {
    const tavilyApiKey = process.env.TAVILY_API_KEY;
    if (!tavilyApiKey)
        throw new Error(
            "A valid TAVILY_API_KEY is not set, check the .env.local.example",
        );

    const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            api_key: tavilyApiKey,
            query,
            max_results: Math.max(maxResults, 5),
            search_depth: searchDepth,
            include_images: true,
            include_image_descriptions: true,
            include_answers: true,
            include_domains: includeDomains,
            exclude_domains: excludeDomains,
        }),
    });

    if (!response.ok) {
        throw new Error(
            `Tavily Search API error: ${response.status}, ${response.statusText}`,
        );
    }

    const data = await await response.json();
    const images = data.images
        .map(({ url, description }: { url: string; description: string }) => ({
            url: url,
            description,
        }))
        .filter(
            (
                image: SearchResultImage,
            ): image is { url: string; description: string } =>
                typeof image === "object" &&
                image.description !== undefined &&
                image.description !== "",
        );

    return {
        ...data,
        images,
    };
}
