import { CloseEye, OpenEye } from "shared/ui/icons"

interface ShowPasswordProps {
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
    className?: string;
    tabIndex?: number;
}

export const ShowPassword = ({ setShowPassword, showPassword, className, tabIndex }: ShowPasswordProps) => {
    return (
        <div className={className} tabIndex={tabIndex}>
            {!showPassword ? (
                <CloseEye size={22} onClick={() => setShowPassword(!showPassword)} />
            ) : (
                <OpenEye size={22} onClick={() => setShowPassword(!showPassword)} />
            )}
        </div>
    )
}