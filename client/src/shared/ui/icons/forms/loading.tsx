import type { IconProps } from "../type";

export const Loading = ({ width, height, size, name, className, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={width || size}
        height={height || size}
        viewBox="0 0 24 24" fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        name={name}
        {...props}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
)