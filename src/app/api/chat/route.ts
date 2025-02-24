import { NextRequest, NextResponse } from "next/server";
import { isProviderEnabled } from "@/lib/utils/registry";
import { createStreamResponse } from "@/lib/stream/create-stream-response";
import { getAuth } from "@clerk/nextjs/server";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
    try {
        const { id: chatId, messages } = await request.json();
        const { userId } = await getAuth(request);

        if (!userId)
            return NextResponse.json({
                status: 401,
                message: `Must be signed in first.`,
            });

        const model = "openai:gpt-4o-mini"; // hard coded for now
        const provider = model.split(":")[0];

        if (!isProviderEnabled(provider))
            return NextResponse.json({
                status: 404,
                message: `Current provider: '${provider}', is not enabled.`,
            });

        return createStreamResponse({
            chatId,
            model,
            messages,
        });
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
