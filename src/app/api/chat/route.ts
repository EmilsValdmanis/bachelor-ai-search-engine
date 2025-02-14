import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { registry } from "@/lib/utils/registry";
// import { fetchTavilyExtract } from "@/lib/tools/extract";
// import { fetchTavilySearch } from "@/lib/tools/search";

// const result = await fetchTavilyExtract("https://nextjs.org/docs");

// const result = await fetchTavilySearch(
//     "Who is the current president of the USA?",
// );

export async function POST(request: NextRequest) {
    try {
        const { id, messages } = await request.json();

        console.log(id);
        console.log(messages);

        const result = streamText({
            model: registry.languageModel("openai:gpt-4o-mini"),
            system: "You are a helpful assistant.",
            prompt: messages[0].content,
        });

        return result.toDataStreamResponse();
    } catch (error: unknown) {
        console.error("API route error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
                status: 500,
            },
            { status: 500 },
        );
    }
}
