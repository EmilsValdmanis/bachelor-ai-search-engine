import { DataStreamWriter, createDataStreamResponse, streamText } from "ai";
import { StreamConfig } from "./types";
import { registry } from "../utils/registry";

export const createStreamResponse = (config: StreamConfig) => {
    return createDataStreamResponse({
        execute: async (dataStream: DataStreamWriter) => {
            try {
                const { chatId, model, messages } = config;

                console.log(chatId);

                const result = streamText({
                    model: registry.languageModel(model),
                    system: "You are a helpful assistant.", // may want to abstract this out into a file that explains what the model is mean to do in more detail
                    prompt: messages[messages.length - 1].content, // just a temporary way of handling the logic as it wont have context
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
