import { useSearch } from "../contexts/SearchContext";
import { DropdownIcon } from "../assets/Dropdown";
import { useState } from "react";

export default function GenresDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [lastHovered, setLastHovered] = useState('')
    const { genresFilter, handleSetGenresFilter } = useSearch()

    const options = ['Action', 'Adventure', 'Avant Garde', 'Award Winning', 'Boys Love', 'Comedy', 'Drama', 'Ecchi', 'Erotica', 'Fantasy', 'Girls Love', 'Gourmet', 'Hentai', 'Horror',
        'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Suspense']

    return (
        <button className={`text-sm relative w-40 h-8 bg-gray-100 dark:bg-gray-700 rounded-md cursor-default ${isOpen ? 'rounded-b-none' : ''}`}
            onBlur={() => {
                isOpen && setIsOpen(false)
                lastHovered && setLastHovered('')
            }}
            onClick={() => {
                lastHovered && setLastHovered('')
                setIsOpen(!isOpen)
            }}>
            <div className={`flex items-center px-3`}>
                <h5>
                    {`Add Genre Filter`}
                </h5>
                <DropdownIcon className={`ml-auto ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            <div className={`absolute w-full bg-gray-100 dark:bg-gray-700 rounded-md rounded-t-none mt-1 overflow-auto h-40 dark:dropdown-scroll-dark dropdown-scroll-light ${isOpen ? '' : 'hidden'}`}>
                <ul>
                    {options.map(option => (
                        <li key={option} className={`group h-8 w-full ${genresFilter.includes(option) ? 'hidden' : ''}`}
                            onMouseDown={() => {
                                setIsOpen(false)
                                handleSetGenresFilter(option)
                                lastHovered && setLastHovered('')
                            }}
                            onMouseEnter={() => {
                                lastHovered !== (option) && setLastHovered(option)
                            }} >
                            <div className={`px-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 ${lastHovered === option ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                                <div className={`h-[1px] bg-gray-200 dark:bg-gray-600`}></div>
                            </div>
                            <div className={`flex items-center px-3 pb-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 h-full ${lastHovered === option ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                                <h5>
                                    {option}
                                </h5>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </button>
    )
}