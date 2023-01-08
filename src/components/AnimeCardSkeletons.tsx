import { useEffect, useState } from "react"

export default function AnimeCardSkeletons() {
    const [opacity, setOpacity] = useState(0)

    // Makes sure there's no layout shift in the userMenu applying opacity transition.
    useEffect(() => {
        setTimeout(() => {
            setOpacity(100)
        }, 100)
    }, [])

    const cards = Array.from({ length: 24 })

    return (
        <>
            {cards.map((value, i) => (
                <div key={i} className={`flex flex-col justify-center flex-1 min-w-[22rem] max-w-[24rem] animate-pulse ${opacity === 100 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`flex h-16 items-center justify-center`}>
                        <div className={`flex justify-center items-center flex-1`}>
                            <div className={`bg-gray-100 dark:bg-gray-700 h-8 w-10/12 rounded-full`} />
                        </div>
                    </div>
                    <div className={`text-sm flex justify-center items-center gap-4 py-2`}>
                        <span className={`h-5 w-20 bg-gray-100 dark:bg-gray-700 rounded-full`} />
                        <div className={`w-[1px] h-4 bg-gray-200 dark:bg-gray-600`} />
                        <span className={`h-5 w-20 bg-gray-100 dark:bg-gray-700 rounded-full`} />
                    </div>
                    <div className={`bg-gray-200 dark:bg-gray-800 rounded-lg`}>
                        <div className={`flex justify-center gap-2.5 py-2 overflow-hidden`}>
                            <div className={`flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs h-5 w-16 px-2.5`} />
                            <div className={`flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs h-5 w-16 px-2.5`} />
                            <div className={`flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs h-5 w-16 px-2.5`} />
                        </div>
                        <div className={`flex rounded-lg overflow-hidden`}>
                            <div className={`w-1/2 aspect-[167/237] bg-gray-50 dark:bg-gray-900/50`}>
                            </div>
                            <div className={`w-1/2 bg-gray-100 dark:bg-gray-700`}>
                                <div className={`pl-3 pr-1 py-1`}>
                                    <div className={`flex flex-col gap-2 leading-5 whitespace-pre-wrap pr-3 overflow-y-auto card-scroll-light dark:card-scroll-dark w-full h-full aspect-[189/254]`}>
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-full mt-1.5`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-full`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-full`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-1/2`} />
                                        <div className={`rounded-full h-3 w-full`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-full`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-full`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-full`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-4/5`} />
                                        <div className={`rounded-full h-3 w-full`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-full`} />
                                        <div className={`rounded-full bg-gray-200  dark:bg-gray-600 h-3 w-1/4`} />
                                    </div>
                                </div>
                                <div className={`flex justify-around items-center h-9 rounded-tr-lg bg-gray-200 dark:bg-gray-800`}>
                                    <div className={`flex items-center gap-1`}>
                                        <span className={`h-5 w-14 bg-gray-100 dark:bg-gray-700 rounded-full`}></span>
                                    </div>
                                    <button className={`h-5 w-6 bg-gray-100 dark:bg-gray-700 rounded-full`}>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}