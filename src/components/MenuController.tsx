import Link from "next/link"
import { Logo, MenuIcon } from "../assets"
import { useMenu } from "../contexts/MenuContext"
import { useSearch } from "../contexts/SearchContext";
import { useQueryClient } from 'react-query'
import { useFavorite } from "../contexts/FavoriteContext";

export default function MenuController() {
    const { handleToggleMenu } = useMenu()
    const { resetSearchStates } = useSearch()
    const { resetPage } = useFavorite()
    const queryClient = useQueryClient()

    return (
        <div className={`flex items-center gap-2 pr-2.5 flex-1`}>
            <button onClick={handleToggleMenu} className={`hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full`}>
                <MenuIcon />
            </button>
            <Link href={'/'} onClick={() => {
                resetSearchStates()
                resetPage()
                queryClient.clear()
            }} >
                <Logo />
            </Link>
        </div>
    )
}