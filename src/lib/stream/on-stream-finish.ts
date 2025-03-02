import { CoreMessage, DataStreamWriter, JSONValue, Message } from "ai";
import { saveChat } from "../actions/chat";
import { generateRelatedQuestions } from "./generate-related-questions";
import {
    convertToExtendedCoreMessages,
    ExtendedCoreMessage,
} from "../utils/messages";

interface onChatStreamFinishProps {
    oldMessages: Message[];
    responseMessages: CoreMessage[];
    userId: string;
    chatId: string;
    model: string;
    dataStream: DataStreamWriter;
}

export const onChatStreamFinish = async ({
    oldMessages,
    responseMessages,
    userId,
    chatId,
    model,
    dataStream,
}: onChatStreamFinishProps) => {
    try {
        const oldExtendedCoreMessages =
            convertToExtendedCoreMessages(oldMessages);

        // TODO: maybe there are cases when the related questions should not be shown?
        // This is done to show that related questions are being generated
        const relatedQuestionsAnnotation: JSONValue = {
            type: "related-questions",
            data: { questions: [] },
        };
        dataStream.writeMessageAnnotation(relatedQuestionsAnnotation);

        const relatedQuestions = await generateRelatedQuestions(
            responseMessages,
            model,
        );

        // Once the related questions are generated we can stream them in
        const generatedRelatedQuestionsAnnotation: ExtendedCoreMessage = {
            role: "data",
            content: {
                type: "related-questions",
                data: relatedQuestions.object,
            },
        };

        dataStream.writeMessageAnnotation(
            generatedRelatedQuestionsAnnotation.content as JSONValue,
        );
        const annotations: ExtendedCoreMessage[] = [
            generatedRelatedQuestionsAnnotation,
        ];

        // TODO: the order of these should be figured out to be able to save and load them in the same order
        const allMessages = [
            ...oldExtendedCoreMessages,
            ...annotations,
            ...responseMessages,
        ] as ExtendedCoreMessage[];

        // TODO: Save chat (update or create)
        await saveChat(userId, chatId, allMessages).catch((error) => {
            console.error("Error saving chat:", error);
            throw new Error("Error saving chat");
        });
    } catch (error) {
        console.error("Error when handling stream finish:", error);
        throw error;
    }
};
