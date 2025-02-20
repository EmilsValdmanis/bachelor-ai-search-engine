import { Message } from "ai";
import { CircleUser } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

function UserMessage({ message }: { message: Message }) {
    const { user, isLoaded } = useUser();
    return (
        <div className="flex items-start justify-end gap-2">
            <p className="bg-muted prose-sm prose-neutral w-fit max-w-[40rem] rounded-3xl border p-4">
                {message.content}
            </p>
            {user?.imageUrl ? (
                isLoaded ? (
                    <Image
                        alt="Profile Icon"
                        src={user?.imageUrl}
                        width={48}
                        height={48}
                        className="mt-4 size-6"
                    />
                ) : (
                    <Skeleton className="size-6 rounded-full" />
                )
            ) : (
                <CircleUser className="mt-4 size-6" />
            )}
        </div>
    );
}

export default UserMessage;
