import { SearchResultImage, SearchResults } from "../types";
import { tool } from "ai";
import { z } from "zod";

export const searchTool = tool({
    description: "Searching the web for info.",
    parameters: z.object({
        query: z.string().describe("The query for searching"),
        maxResults: z.number().describe("The max numbers of results to return"),
        searchDepth: z
            .string()
            .describe("The depth of the search: basic | advanced"),
        includeDomains: z
            .array(z.string())
            .describe(
                "If you want to specifically include some domains in the results",
            ),
        excludeDomains: z
            .array(z.string())
            .describe(
                "If you want to specifically exclude some domains from the results",
            ),
    }),
    execute: async ({
        query,
        maxResults,
        searchDepth,
        includeDomains,
        excludeDomains,
    }) => {
        const resolvedDepth = searchDepth === "advanced" ? "advanced" : "basic";

        console.log("🔍 Executing search with parameters:");
        console.log(`   📝 Query: ${query}`);
        console.log(`   🔢 Max Results: ${maxResults}`);
        console.log(`   📊 Search Depth: ${resolvedDepth}`);
        console.log(
            `   ✅ Include Domains: ${includeDomains.length > 0 ? includeDomains.join(", ") : "None"}`,
        );
        console.log(
            `   ❌ Exclude Domains: ${excludeDomains.length > 0 ? excludeDomains.join(", ") : "None"}`,
        );

        try {
            return await fetchTavilySearch(
                query,
                maxResults,
                resolvedDepth,
                includeDomains,
                excludeDomains,
            );
        } catch (error) {
            console.error("Erorr in search API tool:", error);
            return {
                results: [],
                query,
                images: [],
                number_of_results: 0,
            };
        }
    },
});

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
