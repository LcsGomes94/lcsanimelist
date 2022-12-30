import { Fragment } from "react"
import { useAnimesSeasonalData } from '../hooks/useAnimesSeasonalData'
import { useFavorite } from '../contexts/FavoriteContext'
import SeasonalDropdown from "../components/SeasonalDropdown"
import AnimesShowing from "../components/AnimesShowing"

export default function Seasonal() {
  const { data: animesData, fetchNextPage, hasNextPage } = useAnimesSeasonalData()
  const { isFavorited, addFavorite } = useFavorite()

  return (
    <div className={`mt-20 ml-52 pt-4 pr-3 pl-14 gap-2`}>
      <div className={`flex items-center justify-start pr-11 w-full`}>
        <div className={`flex flex-1 items-center pr-3`}>
          <SeasonalDropdown />
        </div>
        <AnimesShowing />
      </div>

      {hasNextPage && <button onClick={() => fetchNextPage()} >Load More</button>}
      <div>
        {animesData?.pages.map((page, i) => (
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
