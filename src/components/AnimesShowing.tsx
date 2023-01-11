import { useRouter } from "next/router";
import { useFavorite } from "../contexts/FavoriteContext";
import { useSearch } from "../contexts/SearchContext";
import { useAnimesDisplayData } from "../hooks/useAnimesDisplayData";
import { useAnimesSeasonalData } from "../hooks/useAnimesSeasonalData";

type AnimesShowingType = {
    className?: string
}

export default function AnimesShowing({ className }: AnimesShowingType) {
    const { data: animesDisplayData } = useAnimesDisplayData()
    const { data: animesSeasonalData } = useAnimesSeasonalData()
    const { filterFavorite, page } = useFavorite()
    const { favoritedSearchQuery, orderBy, genresFilter } = useSearch()
    const router = useRouter()

    function getShowing(pageName: 'watch' | 'finished' | 'dropped') {
        const filteredAnimes = filterFavorite(pageName, favoritedSearchQuery, genresFilter, orderBy)
        return { visible: page * 24 > filteredAnimes.length ? filteredAnimes.length : page * 24, total: filteredAnimes.length }
    }

    if (router.asPath === '/') {
        return (
            <div className={`block md:block ${className}`}>
                {animesDisplayData?.pages !== undefined &&
                    <h3 className={`text-xs md:text-sm text-cyan-600 dark:text-cyan-400 ml-5 md:ml-11 whitespace-nowrap`}>
                        {`Showing: ${animesDisplayData?.pages.length * 24 < animesDisplayData?.pages[0].pagination.items.total ? animesDisplayData?.pages.length * 24
                            : animesDisplayData?.pages[0].pagination.items.total}/${animesDisplayData?.pages[0].pagination.items.total}`}
                    </h3>}
            </div>
        )
    } else if (router.asPath === '/seasonal') {
        return (
            <div className={`block md:block ${className}`}>
                {animesSeasonalData?.pages !== undefined &&
                    <h3 className={`text-xs md:text-sm text-cyan-600 dark:text-cyan-400 ml-5 md:ml-11 whitespace-nowrap`}>
                        {`Showing: ${animesSeasonalData?.pages.length * 24 < animesSeasonalData?.pages[0].pagination.items.total ? animesSeasonalData?.pages.length * 24
                            : animesSeasonalData?.pages[0].pagination.items.total}/${animesSeasonalData?.pages[0].pagination.items.total}`}
                    </h3>}
            </div>
        )
    } else {
        return (
            router.asPath === '/watch_list' ?
                <div className={`block md:block ${className}`}>
                    <h3 className={`text-xs md:text-sm text-cyan-600 dark:text-cyan-400 ml-5 md:ml-11 whitespace-nowrap`}>
                        {`Showing: ${getShowing('watch').visible}/${getShowing('watch').total}`}
                    </h3>
                </div> :
                router.asPath === '/finished' ?
                    <div className={`block md:block ${className}`}>
                        <h3 className={`text-xs md:text-sm text-cyan-600 dark:text-cyan-400 ml-5 md:ml-11 whitespace-nowrap`}>
                            {`Showing: ${getShowing('finished').visible}/${getShowing('finished').total}`}
                        </h3>
                    </div> :
                    <div className={`block md:block ${className}`}>
                        <h3 className={`text-xs md:text-sm text-cyan-600 dark:text-cyan-400 ml-5 md:ml-11 whitespace-nowrap`}>
                            {`Showing: ${getShowing('dropped').visible}/${getShowing('dropped').total}`}
                        </h3>
                    </div>
        )
    }
}