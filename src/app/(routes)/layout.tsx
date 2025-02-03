import AppSidebar from "./app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppSidebar />
            <main className="flex grow">
                <div className="flex h-full w-full flex-1 flex-col gap-2 border p-4 md:rounded-l-2xl md:p-10">
                    <ModeToggle />
                    {children}
                </div>
            </main>
        </>
    );
}
