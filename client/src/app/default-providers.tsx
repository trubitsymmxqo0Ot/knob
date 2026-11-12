import { type ReactNode } from "react";
import { RootProviders } from "./root-providers";

interface DefaultProvidersProps {
    className?: string;
    children: ReactNode;
}

export const DefaultProviders = ({ children, className }: DefaultProvidersProps) => {
    return (
        <RootProviders className={className}>
                {children}
        </RootProviders>
    );
};
