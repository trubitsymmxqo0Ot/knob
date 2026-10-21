import clsx from "clsx";
import type { ReactNode } from "react"

interface StyleProviderProps {
    children: ReactNode;
    className?: string;
}

export const StyleProvider = ({ children, className }: StyleProviderProps) => {
    return (
        <main className={clsx('h-screen w-full bg-black/90 text-white', className)}>
            {children}
        </main>
    )
}