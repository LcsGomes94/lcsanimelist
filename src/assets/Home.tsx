import { SVGProps } from "react"

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={26}
            height={23}
            viewBox="0 0 26 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M22 13.563v-3.512s-6.695-6.27-8.078-7.439c-1.383-1.167-2.278-.713-3.064 0l-7.826 7.454v9.758c-.056.585.193 1.747 1.63 1.709l4.541-.016M22 19.81c0 1.287-1.118 1.69-1.677 1.724h-4.484M22 16.347v.772M9.203 21.517v-4.192S9.075 13 12.57 13c3.494 0 3.269 4.34 3.269 4.34v4.193m-6.636-.016 6.636.016"
                stroke="currentColor"
                strokeWidth={1.402}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}