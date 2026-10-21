import clsx from "clsx";
import type { ReactNode } from "react";

interface ProvidersProps {
    className?: string;
    children: ReactNode;
}

export const Providers = ({children, className}: ProvidersProps) => {
    return (
        <main className={clsx('h-screen w-full bg-black/90 text-white', className)}>
            {children}
        </main>
    )
}