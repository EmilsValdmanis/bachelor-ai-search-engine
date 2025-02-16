import { createOpenAI } from "@ai-sdk/openai";
import { experimental_createProviderRegistry as createProviderRegistry } from "ai";

export const registry = createProviderRegistry({
    openai: createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    }),
    // TODO: add more providers to the registry
});

export const isProviderEnabled = (provider: string) => {
    switch (provider) {
        case "openai":
            return !!process.env.OPENAI_API_KEY;
        default:
            return false;
    }
};
