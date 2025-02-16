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
                <div className="bg-background flex h-full max-h-[100vh] w-full flex-1 flex-col overflow-auto border md:max-h-[calc(100dvh-48px)] md:rounded-l-2xl">
                    {children}
                </div>
            </main>
        </>
    );
}
