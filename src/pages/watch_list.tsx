import { useState } from "react";
import AnimesShowing from "../components/AnimesShowing";
import GenreFilterGroup from "../components/GenreFilterGroup";
import GenresDropdown from "../components/GenresDropdown";
import OrderByDropdown from "../components/OrderByDropdown";
import { useFavorite } from "../contexts/FavoriteContext";
import { useSearch } from "../contexts/SearchContext";

export default function WatchList() {
  const [hasMore, setHasMore] = useState(false)

  const { filterFavorite, loadMore, page } = useFavorite()
  const { favoritedSearchQuery, orderBy, genresFilter } = useSearch()

  function favoriteList() {
    const filteredAnimes = filterFavorite('watch', favoritedSearchQuery, genresFilter, orderBy)
    if (filteredAnimes.length > page * 24 && hasMore === false) {
      setHasMore(true)
    } else if (filteredAnimes.length <= page * 24 && hasMore === true) {
      setHasMore(false)
    }

    return filteredAnimes.splice(0, page * 24)
  }

  return (
    <div className={`mt-20 ml-52 pt-4 pr-3 pl-14 gap-2`}>
      <div className={`flex items-center justify-start pr-11 w-full`}>
        <div className={`flex flex-1 min-w-0 items-center gap-3 pr-3`}>
          <OrderByDropdown />
          <GenresDropdown />
          <GenreFilterGroup />
        </div>
        <AnimesShowing />
      </div>

      {hasMore && <button onClick={() => loadMore()} >Load More</button>}
      <div>
        {favoriteList().map((animeData, i) => (
          <h1 key={animeData.title + i} className={`mb-3`} >
            {animeData.title}
          </h1>
        ))}
      </div>
    </div>
  )
}
