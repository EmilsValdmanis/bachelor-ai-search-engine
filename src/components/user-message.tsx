import { Message } from "ai";
import { CircleUser } from "lucide-react";

function UserMessage({ message }: { message: Message }) {
    return (
        <div className="flex items-start gap-2 justify-self-end">
            <div className="bg-muted w-fit max-w-[40rem] rounded-3xl border p-4">
                <p>{message.content}</p>
            </div>
            <CircleUser className="mt-4" />
            {/* TODO: once auth is setup the user picture can be used instead with this as a fallback */}
        </div>
    );
}

export default UserMessage;
