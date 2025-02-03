import AppSidebar from "./app-sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppSidebar />
            <main className="flex grow">
                <div className="bg-background flex h-full w-full flex-1 flex-col gap-2 border p-4 md:rounded-l-2xl md:p-10">
                    {children}
                </div>
            </main>
        </>
    );
}
