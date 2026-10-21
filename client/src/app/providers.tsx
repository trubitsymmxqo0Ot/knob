import type { ReactNode } from "react";
import { Navbar } from "widgets/navbar";
import { StyleProvider } from "./style-provider";

interface ProvidersProps {
    className?: string;
    children: ReactNode;
}

export const Providers = ({children, className}: ProvidersProps) => {
    return (
        <StyleProvider className={className}>
            <Navbar/>
            {children}
        </StyleProvider>
    )
}