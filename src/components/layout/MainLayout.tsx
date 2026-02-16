import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
}

/**
 * MainLayout provides a consistent wrapper for all main content areas.
 * It's designed to be used inside the RootLayout's main content area.
 */
export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
        </div>
    );
}
