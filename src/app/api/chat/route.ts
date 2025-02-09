import { NextResponse } from "next/server";
// import { fetchTavilyExtract } from "@/lib/tools/extract";
// import { fetchTavilySearch } from "@/lib/tools/search";

export async function GET() {
    // const result = await fetchTavilyExtract("https://nextjs.org/docs");

    // const result = await fetchTavilySearch(
    //     "Who is the current president of the USA?",
    // );

    return NextResponse.json({ msg: "disabled for api limit conservation" });
}
