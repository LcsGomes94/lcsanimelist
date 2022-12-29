import { SVGProps } from "react"

export function HistoryIcon(props: SVGProps<SVGSVGElement>) {
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
                d="M10.076 1.79a8.979 8.979 0 0 0-6 2.304V2.539a.75.75 0 0 0-1.5 0v2.25a2.25 2.25 0 0 0 2.25 2.25h2.25a.75.75 0 0 0 0-1.5h-2.25a.641.641 0 0 1-.074-.016 7.49 7.49 0 1 1-2.175 5.266.75.75 0 1 0-1.5 0 9 9 0 1 0 9-9Z"
                fill="currentColor"
            />
            <path
                d="M10.076 6.29a.75.75 0 0 0-.75.75v3.75c0 .198.08.389.22.53l2.25 2.25a.75.75 0 0 0 1.06-1.061l-2.03-2.03v-3.44a.75.75 0 0 0-.75-.75Z"
                fill="currentColor"
            />
        </svg>
    )
}