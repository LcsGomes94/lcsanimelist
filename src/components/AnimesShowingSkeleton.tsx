import { useEffect, useState } from "react"

type AnimesShowingSkeletonType = {
    className?: string
}

export default function AnimesShowingSkeleton({ className }: AnimesShowingSkeletonType) {
    const [opacity, setOpacity] = useState(0)

    // Makes sure there's no layout shift in the userMenu applying opacity transition.
    useEffect(() => {
        setTimeout(() => {
            setOpacity(100)
        }, 100)
    }, [])

    return (
        <div className={`ml-5 md:ml-11 h-4 md:h-5 w-24 md:w-28 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse
        ${opacity === 100 ? 'opacity-100' : 'opacity-0'} block md:block ${className}`} />
    )

}