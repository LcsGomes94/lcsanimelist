import { Fragment } from "react"
import { useAnimesSeasonalData } from '../hooks/useAnimesSeasonalData'
import { useFavorite } from '../contexts/FavoriteContext'
import SeasonalDropdown from "../components/SeasonalDropdown"
import AnimesShowing from "../components/AnimesShowing"
import AnimeCard from "../components/AnimeCard"
import { useMenu } from "../contexts/MenuContext"

export default function Seasonal() {
  const { data: animesData, fetchNextPage, hasNextPage } = useAnimesSeasonalData()
  const { normalizeAnime } = useFavorite()
  const { isMenuOpen } = useMenu()

  return (
    <div className={`mt-20 pt-4 pr-3 pl-14 gap-2 ${isMenuOpen ? 'ml-52' : 'ml-[3.375rem]'}`}>
      <div className={`flex items-center justify-start pr-11 w-full`}>
        <div className={`flex flex-1 items-center pr-3`}>
          <SeasonalDropdown />
        </div>
        <AnimesShowing />
      </div>

      <div className={`flex flex-wrap justify-center gap-x-5 gap-y-12 pr-11 pt-11 pb-16`}>
        {animesData?.pages.map((page, i) => (
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
