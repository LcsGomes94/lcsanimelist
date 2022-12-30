import { Fragment } from "react";
import AnimesShowing from "../components/AnimesShowing";
import GenreFilterGroup from "../components/GenreFilterGroup";
import GenresDropdown from "../components/GenresDropdown";
import OrderByDropdown from "../components/OrderByDropdown";
import { useFavorite } from "../contexts/FavoriteContext";
import { useAnimesDisplayData } from "../hooks/useAnimesDisplayData";

export default function Home() {
  const { data, fetchNextPage, hasNextPage } = useAnimesDisplayData()
  const { addFavorite, isFavorited } = useFavorite()

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

      {hasNextPage && <button onClick={() => fetchNextPage()} >Load More</button>}
      <div>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map(anime => {
              return <button key={anime.mal_id} onClick={() => addFavorite(anime)} >{`${anime.title}${isFavorited(anime.mal_id) ? ' - favorited' : ''}`}</button>
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
