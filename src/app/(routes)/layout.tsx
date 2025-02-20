import AppSidebar from "./app-sidebar";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppSidebar />
            <main className="flex grow">
                <div className="bg-background flex h-full max-h-[calc(100dvh-48px)] w-full flex-1 flex-col overflow-auto md:max-h-[100vh] md:rounded-l-2xl md:border">
                    <SignedOut>
                        <header className="flex h-16 items-center justify-end gap-4 p-4">
                            <SignInButton>
                                <Button variant="secondary">Sign in</Button>
                            </SignInButton>

                            <SignUpButton>
                                <Button variant="default">Sign up</Button>
                            </SignUpButton>
                        </header>
                    </SignedOut>
                    {children}
                </div>
            </main>
        </>
    );
}
