import { useState } from "react";
import GenresFilter from "../components/GenreFilter";
import GenresDropdown from "../components/GenresDropdown";
import OrderByDropdown from "../components/OrderByDropdown";
import { useFavorite } from "../contexts/FavoriteContext";
import { useSearch } from "../contexts/SearchContext";

export default function WatchList() {
  const [hasMore, setHasMore] = useState(false)

  const { filterFavorite, loadMore, page } = useFavorite()
  const { favoritedSearchQuery, orderBy, genresFilter } = useSearch()

  function getShowing() {
    const filteredAnimes = filterFavorite('watch', favoritedSearchQuery, genresFilter, orderBy)
    return { visible: page * 24 > filteredAnimes.length ? filteredAnimes.length : page * 24, total: filteredAnimes.length }
  }

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
    <div className={`flex flex-col items-center mt-10 gap-2`}>
      <div className={`flex mr-auto ml-20 gap-3 items-center w-full max-w-[1805px]`}>
        <OrderByDropdown />
        <GenresDropdown />
        <h3 className={`text-sm text-cyan-600 dark:text-cyan-400 ml-auto`} >
          {`Showing: ${getShowing().visible}/${getShowing().total}`}
        </h3>
        {genresFilter.split(',').map(genre => (
          <GenresFilter key={genre} genre={genre} />
        ))}
      </div>
      {favoriteList().map((animeData, i) => (
        <h1 key={animeData.title + i} className={`mb-3`} >
          {animeData.title}
        </h1>
      ))}
      {hasMore && <button onClick={() => loadMore()} >Load More</button>}
    </div>
  )
}
