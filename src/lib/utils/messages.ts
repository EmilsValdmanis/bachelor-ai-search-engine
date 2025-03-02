import { Message, CoreMessage, JSONValue, convertToCoreMessages } from "ai";

export type ExtendedCoreMessage = Omit<CoreMessage, "role" | "content"> & {
    role: CoreMessage["role"] | "data";
    content: CoreMessage["content"] | JSONValue;
};

export const convertToExtendedCoreMessages = (messages: Message[]) => {
    const result: ExtendedCoreMessage[] = [];

    // if message is annotated then convert it to a data message otherwise convert it from message to core message like before
    for (const message of messages) {
        if (message.annotations && message.annotations.length > 0) {
            message.annotations.forEach((annotation) => {
                result.push({
                    role: "data",
                    content: annotation,
                });
            });
        } else {
            const coreMessage = convertToCoreMessages([message]);
            result.push(...coreMessage);
        }
    }

    return result;
};
