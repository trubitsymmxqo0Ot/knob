import type { ReactNode } from "react";
import { Navbar } from "widgets/navbar";
import { StyleProvider } from "./style-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
    className?: string;
    children: ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children, className }: ProvidersProps) => {
    return (
        <StyleProvider className={className}>
            <QueryClientProvider client={queryClient}>
                <Navbar />
                {children}
            </QueryClientProvider>
        </StyleProvider>
    )
}