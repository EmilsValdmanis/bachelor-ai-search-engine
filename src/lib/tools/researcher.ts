import { CoreMessage, streamText, smoothStream } from "ai";
import { registry } from "../utils/registry";
import { searchTool } from "./search";

const SYSTEM_CONTEXT = `
    Instructions:

    You are a helpful AI assistant with access to web search.

    When answering a question:
    1. Use the search tool when necessary to find relevant, up-to-date information.
    2. Analyze all search results carefully to ensure accuracy.
    3. Provide detailed and comprehensive responses based on the search findings.
    4. Cite sources in the [number](url) format, following the order of search results. If multiple sources are relevant, include all of them, separated by commas.
    5. Only use information that has an accessible URL for citation.
    6. If search results are irrelevant or unhelpful, rely on general knowledge.
    7. Structure responses using markdown, with headings for clarity and readability.

    Citation Format:
    [number](url)

    Current Date and Time:
    ${new Date().toLocaleString()}
`;

type ResearcherResult = Parameters<typeof streamText>[0];

export function createResearcher({
    messages,
    model,
}: {
    messages: CoreMessage[];
    model: string;
}): ResearcherResult {
    try {
        return {
            messages,
            model: registry.languageModel(model),
            system: SYSTEM_CONTEXT,
            experimental_transform: smoothStream({ chunking: "word" }),
            tools: {
                search: searchTool,
            },
            maxSteps: 5,
            experimental_activeTools: ["search"],
        };
    } catch (error) {
        console.error("Error in researcher:", error);
        throw error;
    }
}
