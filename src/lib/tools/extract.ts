import { SearchResults } from "@/lib/types";

const CHARACTER_LIMIT = 10000;

export async function fetchTavilyExtract(
    url: string,
): Promise<SearchResults | null> {
    try {
        const tavilyApiKey = process.env.TAVILY_API_KEY;

        if (!tavilyApiKey)
            throw new Error(
                "A valid TAVILY_API_KEY is not set, check the .env.local.example",
            );

        const response = await fetch("https://api.tavily.com/extract", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: tavilyApiKey,
                urls: [url],
            }),
        });
        const res = await response.json();
        if (!res.results || res.results.length === 0) {
            return null;
        }

        const result = res.results[0];
        const content = result.raw_content.slice(0, CHARACTER_LIMIT);

        return {
            results: [
                {
                    title: content.slice(0, 100),
                    content,
                    url: result.url,
                },
            ],
            query: "",
            images: [],
        };
    } catch (error) {
        console.error("Tavily Extract API Failed:", error);
        return null;
    }
}
