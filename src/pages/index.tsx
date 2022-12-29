import Link from "next/link";
import { Fragment } from "react";
import GenresFilter from "../components/GenreFilter";
import GenresDropdown from "../components/GenresDropdown";
import OrderByDropdown from "../components/OrderByDropdown";
import { useFavorite } from "../contexts/FavoriteContext";
import { useSearch } from "../contexts/SearchContext";
import { useAnimesDisplayData } from "../hooks/useAnimesDisplayData";

export default function Home() {
  const { data, fetchNextPage, hasNextPage } = useAnimesDisplayData()
  const { addFavorite, isFavorited } = useFavorite()
  const { genresFilter } = useSearch()

  return (
    <div className={`flex flex-col items-center mt-10 gap-2`}>
      <div className={`flex items-center gap-3 mr-auto ml-20 w-full max-w-[1805px]`}>
        <OrderByDropdown />
        <GenresDropdown />
        {genresFilter.split(',').map(genre => (
          <GenresFilter key={genre} genre={genre} />
        ))}
        {data?.pages !== undefined &&
          <h3 className={`text-sm text-cyan-600 dark:text-cyan-400 ml-auto`}>
            {`Showing: ${data?.pages.length * 24 < data?.pages[0].pagination.items.total ? data?.pages.length * 24
              : data?.pages[0].pagination.items.total}/${data?.pages[0].pagination.items.total}`}
          </h3>}
      </div>
      <Link href={'/watch_list'}>
        <h2>Watch List</h2>
      </Link>
      {hasNextPage && <button onClick={() => fetchNextPage()} >Load More</button>}
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map(anime => {
            return <button key={anime.mal_id} onClick={() => addFavorite(anime)} >{`${anime.title}${isFavorited(anime.mal_id) ? ' - favorited' : ''}`}</button>
          })}
        </Fragment>
      ))}
    </div>
  )
}
