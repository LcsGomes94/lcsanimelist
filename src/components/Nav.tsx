import { DroppedIcon, FinishedIcon, HomeIcon, SeasonalIcon, WatchListIcon } from "../assets"
import { useRouter } from "next/router"
import Link from "next/link"
import { useSearch } from "../contexts/SearchContext"
import { useFavorite } from "../contexts/FavoriteContext"
import { useQueryClient } from "@tanstack/react-query"
import { useMenu } from '../contexts/MenuContext'


export default function Nav() {
    const router = useRouter()
    const { isMenuOpen } = useMenu()
    const { orderBy, genresFilter, searchAnimeDisplayQuery, seasonal } = useSearch()
    const { resetPage } = useFavorite()
    const queryClient = useQueryClient()

    return (
        <nav className={`dark:text-white md:pl-3 md:pt-4 flex md:flex-col md:h-full text-lg gap-3 fixed z-10 bg-gray-100 dark:bg-gray-700 md:bg-white md:dark:bg-gray-900 rounded-t-3xl md:rounded-t-none border-t md:border-t-0 border-gray-200 dark:border-gray-800 inset-0 md:inset-auto top-auto w-full md:w-[4.25rem] ${isMenuOpen ? 'lg:w-52' : 'lg:w-[3.375rem]'}`}>
            <div className={`flex md:flex-col gap-3 w-full justify-around px-1.5 md:px-0`}>
                <Link href={'/'}
                    onClick={() => {
                        router.asPath !== '/' && queryClient.resetQueries({ queryKey: ['display', orderBy, genresFilter, searchAnimeDisplayQuery], exact: true })
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8 md:pt-2 lg:pt-0 lg:px-2 lg:gap-3 md:hover:bg-gray-100 md:dark:hover:bg-gray-700 rounded-md ${router.asPath === '/' ? 'md:bg-gray-100 md:dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <HomeIcon className={`w-[28px] md:w-[31px] lg:w-[26px] h-[25px] md:h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden leading-5 md:leading-7 text-[9px] md:text-[10px]`}>Home</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Home</h2>}
                </Link>
                <Link href={'/seasonal'}
                    onClick={() => {
                        router.asPath !== '/seasonal' && queryClient.resetQueries({ queryKey: ['seasonal', seasonal], exact: true })
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8 md:pt-2 lg:pt-0 lg:px-2 lg:gap-3 md:hover:bg-gray-100 md:dark:hover:bg-gray-700 rounded-md ${router.asPath === '/seasonal' ? 'md:bg-gray-100 md:dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <SeasonalIcon className={`w-[28px] md:w-[31px] lg:w-[26px] h-[25px] md:h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden leading-5 md:leading-7 text-[9px] md:text-[10px]`}>Seasonal</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Seasonal</h2>}
                </Link>
                <div className={`hidden md:block h-[1px] bg-gray-200 dark:bg-gray-600`}></div>
                <Link href={'/watch_list'}
                    onClick={() => {
                        resetPage()
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8 md:pt-2 lg:pt-0 lg:px-2 lg:gap-3 md:hover:bg-gray-100 md:dark:hover:bg-gray-700 rounded-md ${router.asPath === '/watch_list' ? 'md:bg-gray-100 md:dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <WatchListIcon className={`w-[28px] md:w-[31px] lg:w-[26px] h-[25px] md:h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden leading-5 md:leading-7 text-[9px] md:text-[10px]`}>Watch List</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Watch List</h2>}
                </Link>
                <Link href={'/finished'}
                    onClick={() => {
                        resetPage()
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8 md:pt-2 lg:pt-0 lg:px-2 lg:gap-3 md:hover:bg-gray-100 md:dark:hover:bg-gray-700 rounded-md ${router.asPath === '/finished' ? 'md:bg-gray-100 md:dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <FinishedIcon className={`w-[28px] md:w-[31px] lg:w-[26px] h-[25px] md:h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden leading-5 md:leading-7 text-[9px] md:text-[10px]`}>Finished</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Finished</h2>}
                </Link>
                <Link href={'/dropped'}
                    onClick={() => {
                        resetPage()
                    }}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start w-14 lg:w-full h-16 lg:h-8 md:pt-2 lg:pt-0 lg:px-2 lg:gap-3 md:hover:bg-gray-100 md:dark:hover:bg-gray-700 rounded-md ${router.asPath === '/dropped' ? 'md:bg-gray-100 md:dark:bg-gray-700 text-teal-500 dark:text-teal-400' : ''}`}>
                    <DroppedIcon className={`w-[28px] md:w-[31px] lg:w-[26px] h-[25px] md:h-[28px] lg:h-[23px]`} />
                    <h2 className={`lg:hidden leading-5 md:leading-7 text-[9px] md:text-[10px]`}>Dropped</h2>
                    {isMenuOpen && <h2 className={`hidden lg:block`}>Dropped</h2>}
                </Link>
            </div>
        </nav>
    )
}