import { useRouter } from "next/router";
import { useFavorite } from "../contexts/FavoriteContext";
import { useSearch } from "../contexts/SearchContext";
import { useAnimesDisplayData } from "../hooks/useAnimesDisplayData";
import { useAnimesSeasonalData } from "../hooks/useAnimesSeasonalData";

export default function AnimesShowing() {
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
            <div>
                {animesDisplayData?.pages !== undefined &&
                    <h3 className={`text-sm text-cyan-600 dark:text-cyan-400 ml-11 whitespace-nowrap`}>
                        {`Showing: ${animesDisplayData?.pages.length * 24 < animesDisplayData?.pages[0].pagination.items.total ? animesDisplayData?.pages.length * 24
                            : animesDisplayData?.pages[0].pagination.items.total}/${animesDisplayData?.pages[0].pagination.items.total}`}
                    </h3>}
            </div>
        )
    } else if (router.asPath === '/seasonal') {
        return (
            <div>
                {animesSeasonalData?.pages !== undefined &&
                    <h3 className={`text-sm text-cyan-600 dark:text-cyan-400 ml-11 whitespace-nowrap`}>
                        {`Showing: ${animesSeasonalData?.pages.length * 24 < animesSeasonalData?.pages[0].pagination.items.total ? animesSeasonalData?.pages.length * 24
                            : animesSeasonalData?.pages[0].pagination.items.total}/${animesSeasonalData?.pages[0].pagination.items.total}`}
                    </h3>}
            </div>
        )
    } else {
        return (
            router.asPath === '/watch_list' ?
                <div>
                    <h3 className={`text-sm text-cyan-600 dark:text-cyan-400 ml-11 whitespace-nowrap`}>
                        {`Showing: ${getShowing('watch').visible}/${getShowing('watch').total}`}
                    </h3>
                </div> :
                router.asPath === '/finished' ?
                    <div>
                        <h3 className={`text-sm text-cyan-600 dark:text-cyan-400 ml-11 whitespace-nowrap`}>
                            {`Showing: ${getShowing('finished').visible}/${getShowing('finished').total}`}
                        </h3>
                    </div> :
                    <div>
                        <h3 className={`text-sm text-cyan-600 dark:text-cyan-400 ml-11 whitespace-nowrap`}>
                            {`Showing: ${getShowing('dropped').visible}/${getShowing('finished').total}`}
                        </h3>
                    </div>
        )
    }
}