import { DroppedIcon, FinishedIcon, HomeIcon, SeasonalIcon, WatchListIcon } from "../assets"
import { useRouter } from "next/router"
import Link from "next/link"


export default function Nav() {
    const router = useRouter()

    return (
        <nav className={`dark:text-white pl-3 pt-4 flex flex-col w-52 h-full text-lg gap-3 fixed z-10 bg-white dark:bg-gray-900`}>
            <div className={`flex flex-col gap-3`}>
                <Link href={'/'}
                    className={`flex items-center w-full h-8 px-2 gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <HomeIcon />
                    <h2>Home</h2>
                </Link>
                <Link href={'/seasonal'}
                    className={`flex items-center w-full h-8 px-2 gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/seasonal' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <SeasonalIcon />
                    <h2>Seasonal</h2>
                </Link>
            </div>
            <div className={`h-[1px] bg-gray-200 dark:bg-gray-600`}></div>
            <div className={`flex flex-col gap-3`}>
                <Link href={'/watch_list'}
                    className={`flex items-center w-full h-8 px-2 gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/watch_list' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <WatchListIcon />
                    <h2>Watch List</h2>
                </Link>
                <Link href={'/finished'}
                    className={`flex items-center w-full h-8 px-2 gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/finished' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <FinishedIcon />
                    <h2>Finished</h2>
                </Link>
                <Link href={'/dropped'}
                    className={`flex items-center w-full h-8 px-2 gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/dropped' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <DroppedIcon />
                    <h2>Dropped</h2>
                </Link>
            </div>
        </nav>
    )
}