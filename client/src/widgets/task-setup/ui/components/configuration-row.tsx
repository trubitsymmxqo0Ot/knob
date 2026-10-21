import clsx from "clsx";
import type { ReactNode } from "react"

interface ConfigurationRowProps {
    children: ReactNode;
    className?: string;
    title: string;
}

export const ConfigurationRow = ({ children, title, className }: ConfigurationRowProps) => {
    return (
        <div className={clsx("flex gap-3 items-center", className)}>
            <p className="text-[12px] font-semibold text-gray-400">{title}</p>
            {children}
        </div>
    )
}