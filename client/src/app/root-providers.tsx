import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import type { ReactNode } from "react"

interface RootProvidersProps {
    children: ReactNode;
    className?: string;
}
const queryClient = new QueryClient();

export const RootProviders = ({ children, className }: RootProvidersProps) => {
    return (
        <main className={clsx('h-screen w-full bg-black/90 text-white', className)}>
            <HeroUIProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <ToastProvider placement="bottom-right" />
                </QueryClientProvider>
            </HeroUIProvider>
        </main>
    )
}