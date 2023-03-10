import Link from "next/link"
import { Logo, MenuIcon } from "../assets"
import { useMenu } from "../contexts/MenuContext"
import { useSearch } from "../contexts/SearchContext"
import { useQueryClient } from '@tanstack/react-query'

export default function MenuController() {
    const { handleToggleMenu } = useMenu()
    const { resetSearchStates, orderBy, genresFilter, searchAnimeDisplayQuery } = useSearch()
    const queryClient = useQueryClient()

    return (
        <div className={`flex items-center gap-2 pr-2.5 flex-1 pl-1 md:pl-1.5 lg:pl-0`}>
            <button onClick={handleToggleMenu} className={`hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full hidden lg:inline-block`}>
                <MenuIcon />
            </button>
            <Link href={'/'} onClick={() => {
                resetSearchStates()
                queryClient.resetQueries({ queryKey: ['display', orderBy, genresFilter, searchAnimeDisplayQuery], exact: true })
            }} >
                <Logo className={`h-[19px] md:h-[21px] lg:h-[24px] w-[112px] md:w-[124px] lg:w-[142px]`} />
            </Link>
        </div>
    )
}