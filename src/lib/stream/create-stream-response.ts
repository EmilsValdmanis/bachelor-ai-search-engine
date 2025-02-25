import {
    convertToCoreMessages,
    DataStreamWriter,
    createDataStreamResponse,
    streamText,
} from "ai";
import { StreamConfig } from "./types";
import { createResearcher } from "../tools/researcher";
import { getMaxContextTokens, truncateCoreMessages } from "../utils/context";

export const createStreamResponse = (config: StreamConfig) => {
    return createDataStreamResponse({
        execute: async (dataStream: DataStreamWriter) => {
            try {
                const { model, messages, isSearchToolEnabled } = config;

                const coreMessages = convertToCoreMessages(messages);
                const truncatedCoreMesages = truncateCoreMessages({
                    messages: coreMessages,
                    contextMaxTokens: getMaxContextTokens(),
                });

                const researcher = createResearcher({
                    messages: truncatedCoreMesages,
                    model,
                    isSearchToolEnabled,
                });

                const result = streamText({
                    ...researcher,
                });

                result.mergeIntoDataStream(dataStream);
            } catch (error) {
                console.error("Stream response error:", error);
                throw error;
            }
        },
        onError: (error) => {
            console.error("Stream error:", error);
            return error instanceof Error ? error.message : String(error);
        },
    });
};
