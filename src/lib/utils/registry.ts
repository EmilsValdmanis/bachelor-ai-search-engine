import { createOpenAI } from "@ai-sdk/openai";
import { experimental_createProviderRegistry as createProviderRegistry } from "ai";

console.log(process.env.OPENAI_API_KEY);

export const registry = createProviderRegistry({
    openai: createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    }),
    // TODO: add more providers to the registry
});
