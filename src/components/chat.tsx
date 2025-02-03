import React from "react";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";

function Chat() {
    return (
        <div className="stretch mx-auto flex h-full max-h-full w-full max-w-3xl flex-col gap-10">
            <ChatMessages />
            <ChatInput />
        </div>
    );
}

export default Chat;
