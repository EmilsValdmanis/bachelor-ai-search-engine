import { Message } from "ai";

export interface StreamConfig {
    chatId: string;
    model: string;
    messages: Message[];
}
