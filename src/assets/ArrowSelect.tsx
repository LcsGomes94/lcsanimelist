import { SVGProps } from "react"

export function ArrowSelectIcon(props: SVGProps<SVGSVGElement>) {
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
                d="M15.043 17.015a1.003 1.003 0 0 0 1.419-1.418l-1.419 1.418ZM4.483 4.035c-.553 0-1.002.449-1.002 1.002v9.028a1.003 1.003 0 1 0 2.006 0V6.04h8.024a1.003 1.003 0 1 0 0-2.007H4.484Zm11.979 11.562L5.192 4.328 3.775 5.747l11.269 11.268 1.419-1.418Z"
                fill="currentColor"
            />
        </svg>
    )
}