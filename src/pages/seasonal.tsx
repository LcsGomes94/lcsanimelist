import Link from "next/link"
import { Fragment } from "react"
import { useAnimesSeasonalData } from '../hooks/useAnimesSeasonalData'
import { useFavorite } from '../contexts/FavoriteContext'
import SeasonalDropdown from "../components/SeasonalDropdown"

export default function Seasonal() {
  const { data: animesData, fetchNextPage, hasNextPage } = useAnimesSeasonalData()
  const { isFavorited, addFavorite } = useFavorite()

  return (
    <div className={`flex flex-col items-center mt-10 gap-2`}>
      <div className={`mr-auto ml-20 flex items-center w-full max-w-[1805px]`}>
        <SeasonalDropdown />
        {animesData?.pages !== undefined &&
          <h3 className={`text-sm text-cyan-600 dark:text-cyan-400 ml-auto`}>
            {`Showing: ${animesData?.pages.length * 24 < animesData?.pages[0].pagination.items.total ? animesData?.pages.length * 24
              : animesData?.pages[0].pagination.items.total}/${animesData?.pages[0].pagination.items.total}`}
          </h3>}
      </div>
      <Link href={'/watch_list'}>
        <h2>Watch List</h2>
      </Link>
      {hasNextPage && <button onClick={() => fetchNextPage()} >Load More</button>}
      {animesData?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map(anime => {
            return <button key={anime.mal_id} onClick={() => addFavorite(anime)} >{`${anime.title}${isFavorited(anime.mal_id) ? ' - favorited' : ''}`}</button>
          })}
        </Fragment>
      ))}
    </div>
  )
}
