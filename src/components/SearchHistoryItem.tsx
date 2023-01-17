import { ArrowSelectIcon, HistoryIcon, SearchIcon } from "../assets";
import { useFavorite } from "../contexts/FavoriteContext";
import { useModal } from "../contexts/ModalContext";
import { useSearch } from "../contexts/SearchContext";

type SearchHistoryItemProps = {
    type: 'old' | 'new'
    title: string
    selected?: boolean
}

export default function SearchHistoryItem({ type, title, selected }: SearchHistoryItemProps) {
    const { handleSelectSearchItem } = useSearch()
    const { resetPage } = useFavorite()
    const { handleCloseSearchModal } = useModal()

    return (
        <li className={`group`}>
            <button className={`w-full cursor-default bg-white dark:bg-gray-900`} onMouseDown={() => {
                handleSelectSearchItem(title)
                resetPage()
                handleCloseSearchModal()
            }}>
                <div className={`flex items-center gap-3.5 py-3 md:py-2.5 lg:py-3 md:px-5 lg:px-6 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-900 ${selected ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    {type === 'old' ?
                        <HistoryIcon className={`shrink-0 h-[21px] w-[21px] md:h-[19px] md:w-[19px] lg:h-[21px] lg:w-[21px]`} /> :
                        <SearchIcon className={`shrink-0 h-[21px] w-[21px] md:h-[19px] md:w-[19px] lg:h-[21px] lg:w-[21px]`} />}
                    <h5 className={`text-ellipsis whitespace-nowrap overflow-hidden dark:text-gray-200 cursor-default`}>
                        {title}
                    </h5>
                    <ArrowSelectIcon className={`ml-auto shrink-0 h-[21px] w-[21px] md:h-[19px] md:w-[19px] lg:h-[21px] lg:w-[21px]`} />
                </div>
                <div className={`px-6`}>
                    <div className={`h-[1px] bg-gray-200 dark:bg-gray-700 group-last:hidden`}></div>
                </div>
            </button>
        </li>
    )
}