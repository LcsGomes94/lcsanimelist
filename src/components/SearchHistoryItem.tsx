import { ArrowSelectIcon, HistoryIcon, SearchIcon } from "../assets";
import { useFavorite } from "../contexts/FavoriteContext";
import { useSearch } from "../contexts/SearchContext";

type SearchHistoryItemProps = {
    type: 'old' | 'new'
    title: string
    selected?: boolean
}

export default function SearchHistoryItem({ type, title, selected }: SearchHistoryItemProps) {
    const { handleSelectSearchItem } = useSearch()
    const { resetPage } = useFavorite()

    return (
        <li className={`group`}>
            <button className={`w-full cursor-default bg-white dark:bg-gray-900`} onMouseDown={() => {
                handleSelectSearchItem(title)
                resetPage()
            }}>
                <div className={`flex items-center gap-3.5 py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-900 ${ selected ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    {type === 'old' ? <HistoryIcon className={`shrink-0`} /> : <SearchIcon className={`shrink-0`} />}
                    <h5 className={`text-ellipsis whitespace-nowrap overflow-hidden dark:text-gray-200 cursor-default`}>
                        {title}
                    </h5>
                    <ArrowSelectIcon className={`ml-auto shrink-0`} />
                </div>
                <div className={`px-6`}>
                    <div className={`h-[1px] bg-gray-200 dark:bg-gray-700 group-last:hidden`}></div>
                </div>
            </button>
        </li>
    )
}