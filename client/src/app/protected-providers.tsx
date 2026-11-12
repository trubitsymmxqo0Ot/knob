import type { ReactNode } from "react";
import { RootProviders } from "./root-providers";
import { Navbar } from "widgets/navbar";

interface ProtectedProvidersProps {
    children: ReactNode;
    className?: string;
}

export const ProtectedProviders = ({ children, className }: ProtectedProvidersProps) => {
    return (
        <RootProviders className={className}>
            <Navbar />
            {children}
        </RootProviders>
    )
}