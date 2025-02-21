import { CoreMessage } from "ai";

export const truncateCoreMessages = ({
    messages,
    contextMaxTokens,
}: {
    messages: CoreMessage[];
    contextMaxTokens: number;
}): CoreMessage[] => {
    let totalTokens = 0;
    const temp: CoreMessage[] = [];

    // Iterate in reverse so we prioritize newest messages for context
    for (let i = messages.length - 1; i >= 0; i--) {
        const currentMessage = messages[i];
        const messageTokens = currentMessage.content?.length || 0;

        if (totalTokens + messageTokens <= contextMaxTokens) {
            temp.push(currentMessage);
            totalTokens += messageTokens;
        } else {
            break;
        }
    }

    // flip back so the context is not backwards
    const ordered = temp.reverse();

    while (ordered.length > 0 && ordered[0].role !== "user") {
        ordered.shift();
    }

    return ordered;
};

const DEFAULT_MAX_CONTEXT_TOKENS = 128_000; // 4o-mini
const DEFAULT_RESERVE_TOKENS = 28_000; // Set aside some tokens for the response

export const getMaxContextTokens = (): number =>
    DEFAULT_MAX_CONTEXT_TOKENS - DEFAULT_RESERVE_TOKENS;
