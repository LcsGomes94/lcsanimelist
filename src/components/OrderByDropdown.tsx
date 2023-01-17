import { useState } from "react";
import { useRouter } from 'next/router';
import { DropdownIcon } from "../assets/Dropdown";
import { useSearch } from "../contexts/SearchContext";

export default function OrderByDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [lastHovered, setLastHovered] = useState('')
    const { orderBy, handleSetOrderBy } = useSearch()
    const router = useRouter()

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
                    {`Order by: ${orderBy}`}
                </h5>
                <DropdownIcon className={`ml-auto ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            <div className={`absolute w-full bg-gray-100 dark:bg-gray-700 rounded-md rounded-t-none mt-1 overflow-hidden ${isOpen ? '' : 'hidden'}`}>
                <ul>
                    <li className={`group h-8 w-full`}
                        onMouseDown={() => {
                            setIsOpen(false)
                            handleSetOrderBy('Score')
                            lastHovered && setLastHovered('')
                        }}
                        onMouseEnter={() => {
                            lastHovered !== 'Score' && setLastHovered('Score')
                        }} >
                        <div className={`px-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 ${(orderBy === 'Score' && lastHovered === '') || (lastHovered === 'Score') ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                            <div className={`h-[1px] bg-gray-200 dark:bg-gray-600`}></div>
                        </div>
                        <div className={`flex items-center px-3 pb-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 h-full ${(orderBy === 'Score' && lastHovered === '') || (lastHovered === 'Score') ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                            <h5>
                                {`Order by: Score`}
                            </h5>
                        </div>
                    </li>
                    <li className={`group h-8 w-full`}
                        onMouseDown={() => {
                            setIsOpen(false)
                            handleSetOrderBy('Title')
                            setLastHovered('')
                        }}
                        onMouseEnter={() => {
                            lastHovered !== 'Title' && setLastHovered('Title')
                        }} >
                        <div className={`px-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 ${(orderBy === 'Title' && lastHovered === '') || (lastHovered === 'Title') ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                            <div className={`h-[1px] bg-gray-200 dark:bg-gray-600`}></div>
                        </div>
                        <div className={`flex items-center px-3 pb-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 h-full ${(orderBy === 'Title' && lastHovered === '') || (lastHovered === 'Title') ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                            <h5>
                                {`Order by: Title`}
                            </h5>
                        </div>
                    </li>
                    {(router.asPath === '/finished' || router.asPath === 'dropped') &&
                        <li className={`group h-8 w-full`}
                            onMouseDown={() => {
                                setIsOpen(false)
                                handleSetOrderBy('Tier')
                                setLastHovered('')
                            }}
                            onMouseEnter={() => {
                                lastHovered !== 'Tier' && setLastHovered('Tier')
                            }} >
                            <div className={`px-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 ${(orderBy === 'Tier' && lastHovered === '') || (lastHovered === 'Tier') ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                                <div className={`h-[1px] bg-gray-200 dark:bg-gray-600`}></div>
                            </div>
                            <div className={`flex items-center px-3 pb-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 h-full ${(orderBy === 'Tier' && lastHovered === '') || (lastHovered === 'Tier') ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                                <h5>
                                    {`Order by: Tier`}
                                </h5>
                            </div>
                        </li>}
                </ul>
            </div>
        </button>
    )
}