import { SVGProps } from "react"

export function ArrowBackIcon(props: SVGProps<SVGSVGElement>) {
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
                d="M17.991 11.68a1.003 1.003 0 1 0 0-2.006v2.006ZM1.346 9.968a1.003 1.003 0 0 0 0 1.418l6.383 6.384a1.003 1.003 0 0 0 1.418-1.419l-5.674-5.674 5.674-5.674A1.003 1.003 0 1 0 7.73 3.584L1.346 9.968Zm16.645-.294H2.055v2.006H17.99V9.674Z"
                fill="currentColor"
            />
        </svg>
    )
}