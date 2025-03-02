import { JSONValue } from "ai";
import { Skeleton } from "./ui/skeleton";
import { Link2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface RelatedQuestionsProps {
    relatedQuestions: JSONValue;
    onQuerySelect: (query: string) => void;
}

interface RelatedQuestionsAnnotation extends Record<string, JSONValue> {
    type: "related-questions";
    data: {
        questions: Array<{ query: string }>;
    };
}

function RelatedQuestions({
    relatedQuestions,
    onQuerySelect,
}: RelatedQuestionsProps) {
    if (!relatedQuestions || !Array.isArray(relatedQuestions)) return null;

    // We do this since to capture loading state we add empty related question annotation in the backend
    const lastRelatedQuestions = relatedQuestions[
        relatedQuestions.length - 1
    ] as RelatedQuestionsAnnotation;

    const relatedQuestionAnnoation = lastRelatedQuestions.data;

    if (!relatedQuestionAnnoation || !relatedQuestionAnnoation.questions)
        return null;

    // TODO: display related questions as they are streamed in not all at the same time

    return (
        <div className="mt-2 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-1 text-base font-semibold">
                <Link2 className="stroke-muted-foreground size-4" />
                <p>Related</p>
            </div>
            {relatedQuestionAnnoation.questions.length === 0 ? (
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                </div>
            ) : (
                <div className="text-muted-foreground ml-2 flex flex-col gap-2">
                    {relatedQuestionAnnoation.questions.map(
                        (question, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                whileHover={{
                                    scale: 1.01,
                                    x: 10,
                                    opacity: 0.5,
                                }}
                                transition={{
                                    delay: index * 0.05,
                                }}
                                onClick={() => onQuerySelect(question?.query)}
                                className="flex cursor-pointer items-center gap-1"
                            >
                                <ChevronRight className="size-4" />
                                {question.query}
                            </motion.div>
                        ),
                    )}
                </div>
            )}
        </div>
    );
}

export default RelatedQuestions;
