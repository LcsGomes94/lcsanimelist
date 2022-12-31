import z from 'zod'
import { useSearch } from "../contexts/SearchContext";
import { useSeasonsData } from "../hooks/useSeasonsData";
import { DropdownIcon } from "../assets/Dropdown";
import { useState } from "react";

const optionsValidator = z.array(z.object({
    year: z.number(),
    season: z.union([z.literal('Winter'), z.literal('Spring'), z.literal('Summer'), z.literal('Fall')])
}))

export default function SeasonalDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [lastHovered, setLastHovered] = useState('')
    const { data: seasonsData } = useSeasonsData()
    const { seasonal, handleSetSeasonal } = useSearch()

    function getOptions() {
        const normalizedOptions: {}[] = []
        seasonsData?.forEach(value => {
            value.seasons.forEach(season => {
                normalizedOptions.push({ year: value.year, season: season.replace(/^\w/, c => c.toUpperCase()) })
            })
        })

        return optionsValidator.parse(normalizedOptions)
    }

    return (
        <button className={`relative text-sm w-40 h-8 bg-gray-100 dark:bg-gray-700 rounded-md cursor-default ${isOpen ? 'rounded-b-none' : ''}`}
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
                    {`${seasonal.year} - ${seasonal.season}`}
                </h5>
                <DropdownIcon className={`ml-auto ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            <div className={`absolute w-full bg-gray-100 dark:bg-gray-700 rounded-md rounded-t-none mt-1 overflow-auto h-40 dark:dropdown-scroll-dark dropdown-scroll-light
                ${isOpen ? '' : 'hidden'}`}>
                <ul>
                    {getOptions().map(option => (
                        <li key={option.year + option.season} className={`group h-8 w-full`}
                            onMouseDown={() => {
                                setIsOpen(false)
                                handleSetSeasonal(option)
                                lastHovered && setLastHovered('')
                            }}
                            onMouseEnter={() => {
                                lastHovered !== (option.year + option.season) && setLastHovered(option.year + option.season)
                            }} >
                            <div className={`px-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-600
                                ${(seasonal.year + seasonal.season === option.year + option.season && lastHovered === '') ||
                                (lastHovered === option.year + option.season ) ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                                <div className={`h-[1px] bg-gray-200 dark:bg-gray-600`}></div>
                            </div>
                            <div className={`flex items-center px-3 pb-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 h-full
                                ${(seasonal.year + seasonal.season === option.year + option.season && lastHovered === '') ||
                                (lastHovered === option.year + option.season ) ? 'bg-gray-200 dark:bg-gray-600' : ''}`}>
                                <h5>
                                    {`${option.year} - ${option.season}`}
                                </h5>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </button>
    )
}