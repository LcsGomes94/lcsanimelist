import { SVGProps } from "react"

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={21}
            height={21}
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15.78 5.086a.95.95 0 0 0-1.345 0l-4.359 4.359-4.358-4.359A.95.95 0 0 0 4.374 6.43l4.359 4.359-4.36 4.359a.95.95 0 0 0 1.345 1.343l4.358-4.358 4.36 4.358a.95.95 0 0 0 1.343-1.343l-4.359-4.36 4.36-4.358a.95.95 0 0 0 0-1.344Z"
                fill="currentColor"
            />
        </svg>
    )
}