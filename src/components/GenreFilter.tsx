import { useSearch } from "../contexts/SearchContext";
import { CloseIcon } from "../assets";

type GenresFilterProps = {
    genre: string
}

export default function GenresFilter({ genre }: GenresFilterProps ) {
    const { genresFilter, handleRemoveGenreFilter } = useSearch()

    return (
        <button className={`flex items-center gap-1.5 h-7 text-sm text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-700 rounded-full px-3.5
        hover:bg-gray-200 dark:hover:bg-gray-600 ${!genresFilter ? 'hidden' : ''}`}
            onClick={() => {
                handleRemoveGenreFilter(genre)
            }}>
            <span className={`whitespace-nowrap`}>{genre}</span>
            {<CloseIcon className={`text-gray-900 dark:text-white pt-0.5`} height={14} width={14} />}
        </button>
    )
}