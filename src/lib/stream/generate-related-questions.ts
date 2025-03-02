import { CoreMessage, generateObject } from "ai";
import { registry } from "../utils/registry";
import { z } from "zod";

export const generateRelatedQuestions = async (
    responseMessages: CoreMessage[],
    model: string,
) => {
    const lastMessages = responseMessages.slice(-1).map((last) => ({
        ...last,
        role: "user",
    })) as CoreMessage[];

    return await generateObject({
        model: registry.languageModel(model),
        system: `As a professional AI web researcher, you are tasked with generating four queries that try to explore the initial subject more deeply. 
        Use the information from the question and the response. 

        If the original query was "What are the benefits of AI in healthcare?", generate related questions such as:
        - How does AI improve diagnostic accuracy in medicine?
        - What are the challenges of implementing AI in hospitals?
        - How is AI used in drug discovery and development?
        - What are ethical concerns surrounding AI in healthcare?

        The queries should try to go deeper aspects and should not repeat the intial question.
        The idea is to give a user an easy way to explore the subject at hand.

        Match the initial question language to the generated questions, i.e., if the users inputs a question in Latvian then the related questions should also be in Latvian.
        `,
        messages: lastMessages,
        schema: z.object({
            questions: z
                .array(
                    z.object({
                        query: z.string(),
                    }),
                )
                .length(4),
        }),
    });
};
