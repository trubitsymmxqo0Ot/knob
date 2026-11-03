import { CloseEye, OpenEye } from "shared/ui/icons"

interface ShowPasswordProps {
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
    className?: string;
}

export const ShowPassword = ({ setShowPassword, showPassword, className }: ShowPasswordProps) => {
    return (
        <div className={className}>
            {!showPassword ? (
                <CloseEye size={22} onClick={() => setShowPassword(!showPassword)} />
            ) : (
                <OpenEye size={22} onClick={() => setShowPassword(!showPassword)} />
            )}
        </div>
    )
}