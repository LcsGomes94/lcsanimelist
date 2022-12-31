import { Fragment } from "react";
import AnimeCard from "../components/AnimeCard";
import AnimesShowing from "../components/AnimesShowing";
import GenreFilterGroup from "../components/GenreFilterGroup";
import GenresDropdown from "../components/GenresDropdown";
import OrderByDropdown from "../components/OrderByDropdown";
import { useFavorite } from "../contexts/FavoriteContext";
import { useMenu } from "../contexts/MenuContext";
import { useAnimesDisplayData } from "../hooks/useAnimesDisplayData";

export default function Home() {
  const { data, fetchNextPage, hasNextPage } = useAnimesDisplayData()
  const { normalizeAnime } = useFavorite()
  const { isMenuOpen } = useMenu()

  return (
    <div className={`mt-20 pt-4 pr-3 pl-14 gap-2 ${isMenuOpen ? 'ml-52' : 'ml-[3.375rem]'}`}>
      <div className={`flex items-center justify-start pr-11 w-full`}>
        <div className={`flex flex-1 min-w-0 items-center gap-3 pr-3`}>
          <OrderByDropdown />
          <GenresDropdown />
          <GenreFilterGroup />
        </div>
        <AnimesShowing />
      </div>

      <div className={`flex flex-wrap justify-center gap-x-5 gap-y-12 pr-11 pt-11 pb-16`}>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map(anime => (
              <AnimeCard key={anime.mal_id} anime={normalizeAnime(anime)} />
            ))}
          </Fragment>
        ))}
      </div>

      {hasNextPage && <button onClick={() => fetchNextPage()} >Load More</button>}
    </div>
  )
}
