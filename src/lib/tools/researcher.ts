import { CoreMessage, streamText, smoothStream } from "ai";
import { registry } from "../utils/registry";

const SYSTEM_CONTEXT = `
    You are a helpful assistant.
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
        };
    } catch (error) {
        console.error("Error in researcher:", error);
        throw error;
    }
}
