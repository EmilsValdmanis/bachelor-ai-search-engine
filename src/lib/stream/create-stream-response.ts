import {
    convertToCoreMessages,
    DataStreamWriter,
    createDataStreamResponse,
    streamText,
    Message,
} from "ai";
import { createResearcher } from "../tools/researcher";
import { getMaxContextTokens, truncateCoreMessages } from "../utils/context";
import { onChatStreamFinish } from "./on-stream-finish";

export interface StreamConfig {
    chatId: string;
    model: string;
    messages: Message[];
    isSearchToolEnabled: boolean;
    userId: string;
}

export const createStreamResponse = (config: StreamConfig) => {
    return createDataStreamResponse({
        execute: async (dataStream: DataStreamWriter) => {
            try {
                const { chatId, model, messages, isSearchToolEnabled, userId } =
                    config;

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
                    onFinish: async (result) => {
                        await onChatStreamFinish({
                            oldMessages: messages,
                            responseMessages: result.response.messages,
                            userId,
                            chatId,
                            model,
                            dataStream,
                        });
                    },
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
