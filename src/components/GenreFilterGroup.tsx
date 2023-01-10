import { useSearch } from "../contexts/SearchContext";
import { useState } from "react";
import GenreFilterItem from "./GenreFilterItem";

type GenreFilterGroupType = {
    className?: string
}

export default function GenreFilterGroup({ className }: GenreFilterGroupType) {
    const [genresScrollStage, setGenresScrollStage] = useState<'start' | 'end' | 'middle'>('start')
    const { genresFilter } = useSearch()

    return (
        <div className={`flex flex-1 min-w-0 items-center gap-3 ${className}`}>
            <div className={`w-8 h-7 -mr-11 z-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent ${genresScrollStage === 'start' ? 'hidden' : ''}`} />
            <div className={`flex flex-1 min-w-0 gap-2.5 md:gap-3 whitespace-nowrap scrollbar-none overflow-hidden hover:overflow-x-auto`}
                onWheel={e => {
                    const div = e.currentTarget
                    const deltaY = -e.deltaY
                    const scrollLeft = div.scrollLeft - (deltaY * 1)
                    div.scrollTo({ left: scrollLeft, behavior: "auto" })

                    const scrollStage = div.scrollLeft === 0 ? 'start' : div.scrollWidth - div.scrollLeft === div.clientWidth ? 'end' : 'middle'
                    genresScrollStage !== scrollStage && setGenresScrollStage(scrollStage)
                }} >
                {genresFilter.split(',').map(genre => (
                    <GenreFilterItem key={genre} genre={genre} />
                ))}
            </div>
            <div className={`w-8 h-7 -ml-11 z-10 bg-gradient-to-r from-transparent to-white dark:to-gray-900 ${genresScrollStage === 'end' ? 'hidden' : ''}`} />
        </div>
    )
}