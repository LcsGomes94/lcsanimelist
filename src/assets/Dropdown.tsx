import { SVGProps } from "react"

export function DropdownIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={10}
            height={6}
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11.676.992a.85.85 0 0 0-1.207 0L6.577 4.884a.85.85 0 0 1-1.207 0L1.478.992A.85.85 0 1 0 .27 2.19l3.9 3.901a2.55 2.55 0 0 0 3.604 0l3.901-3.9a.85.85 0 0 0 0-1.199Z"
                fill="currentColor"
            />
        </svg>
    )
}