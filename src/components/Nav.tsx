import { DroppedIcon, FinishedIcon, HomeIcon, SeasonalIcon, WatchListIcon } from "../assets"
import { useRouter } from "next/router"
import Link from "next/link"
import { useSearch } from "../contexts/SearchContext"
import { useFavorite } from "../contexts/FavoriteContext"
import { useQueryClient } from "react-query"
import { useMenu } from '../contexts/MenuContext'


export default function Nav() {
    const router = useRouter()
    const { isMenuOpen } = useMenu()
    const { resetSearchStates } = useSearch()
    const { resetPage } = useFavorite()
    const queryClient = useQueryClient()

    return (
        <nav className={`dark:text-white pl-3 pt-4 flex flex-col h-full text-lg gap-3 fixed z-10 bg-white dark:bg-gray-900 w-[4.25rem] ${isMenuOpen ? 'lg:w-52' : 'lg:w-[3.375rem]'}`}>
            <div className={`flex flex-col gap-3`}>
                <Link href={'/'}
                    onClick={() => {
                        resetSearchStates()
                        resetPage()
                        queryClient.clear()
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8
                    pt-2 lg:pt-0 lg:px-2 lg:gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <HomeIcon className={`w-[31px] lg:w-[26px] h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden text-[10px]`}>Home</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Home</h2>}
                </Link>
                <Link href={'/seasonal'}
                    onClick={() => {
                        resetSearchStates()
                        resetPage()
                        queryClient.clear()
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8
                    pt-2 lg:pt-0 lg:px-2 lg:gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/seasonal' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <SeasonalIcon className={`w-[31px] lg:w-[26px] h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden text-[10px]`}>Seasonal</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Seasonal</h2>}
                </Link>
            </div>
            <div className={`h-[1px] bg-gray-200 dark:bg-gray-600`}></div>
            <div className={`flex flex-col gap-3`}>
                <Link href={'/watch_list'}
                    onClick={() => {
                        resetSearchStates()
                        resetPage()
                        queryClient.clear()
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8
                    pt-2 lg:pt-0 lg:px-2 lg:gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/watch_list' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <WatchListIcon className={`w-[31px] lg:w-[26px] h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden text-[10px]`}>Watch List</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Watch List</h2>}
                </Link>
                <Link href={'/finished'}
                    onClick={() => {
                        resetSearchStates()
                        resetPage()
                        queryClient.clear()
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8
                    pt-2 lg:pt-0 lg:px-2 lg:gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/finished' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <FinishedIcon className={`w-[31px] lg:w-[26px] h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden text-[10px]`}>Finished</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Finished</h2>}
                </Link>
                <Link href={'/dropped'}
                    onClick={() => {
                        resetSearchStates()
                        resetPage()
                        queryClient.clear()
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8
                    pt-2 lg:pt-0 lg:px-2 lg:gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md
                    ${router.asPath === '/dropped' ? 'bg-gray-100 dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <DroppedIcon className={`w-[31px] lg:w-[26px] h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden text-[10px]`}>Dropped</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Dropped</h2>}
                </Link>
            </div>
        </nav>
    )
}