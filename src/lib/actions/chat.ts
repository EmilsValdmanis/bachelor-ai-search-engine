"use server";

// import { Redis } from "@upstash/redis";
import { ExtendedCoreMessage } from "../utils/messages";

// const redis = Redis.fromEnv();

export const saveChat = async (
    userId: string,
    chatId: string,
    messages: ExtendedCoreMessage[],
) => {
    console.log("Chat ID:", chatId);
    console.log("User ID:", userId);
    console.log("Messages: ", messages);
};
