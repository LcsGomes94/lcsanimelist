import { useEffect, useState } from "react"

export default function AnimesShowingSkeleton() {
    const [opacity, setOpacity] = useState(0)

    // Makes sure there's no layout shift in the userMenu applying opacity transition.
    useEffect(() => {
        setTimeout(() => {
            setOpacity(100)
        }, 100)
    }, [])

    return (
        <div className={`h-5 w-28 bg-gray-100 dark:bg-gray-700 rounded-full ${opacity === 100 ? 'opacity-100' : 'opacity-0'}`} />
    )

}