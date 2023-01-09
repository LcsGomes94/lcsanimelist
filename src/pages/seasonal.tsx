import { Fragment, useRef, useEffect } from "react"
import { useAnimesSeasonalData } from '../hooks/useAnimesSeasonalData'
import { useFavorite } from '../contexts/FavoriteContext'
import SeasonalDropdown from "../components/SeasonalDropdown"
import AnimesShowing from "../components/AnimesShowing"
import AnimeCard from "../components/AnimeCard"
import { useMenu } from "../contexts/MenuContext"
import AnimesShowingSkeleton from "../components/AnimesShowingSkeleton"
import AnimeCardSkeletons from "../components/AnimeCardSkeletons"

export default function Seasonal() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useAnimesSeasonalData()
  const { normalizeAnime } = useFavorite()
  const { isMenuOpen } = useMenu()

  const observer = useRef<IntersectionObserver | null>(null)
  const lastAnimeElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasNextPage) {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      })

      if (lastAnimeElement.current) {
        observer.current.observe(lastAnimeElement.current)
      }
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [data])

  return (
    <div className={`mt-20 pt-4 pr-3 pl-8 lg:pl-14 gap-2 ml-[4.25rem] ${isMenuOpen ? 'lg:ml-52' : 'lg:ml-[3.375rem]'}`}>
      <div className={`flex items-center justify-start pr-2 lg:pr-11 w-full`}>
        <div className={`flex flex-1 items-center pr-3`}>
          <SeasonalDropdown />
        </div>
        {isFetching ? <AnimesShowingSkeleton /> : <AnimesShowing />}
      </div>

      <div className={`flex flex-wrap justify-center gap-x-5 gap-y-12 pr-1.5 lg:pr-11 pt-11 pb-16`}>
        {data?.pages.map((page, pageI) => (
          <Fragment key={pageI}>
            {page.data.map((anime, animeI) => {
              const isLast = (animeI === page.data.length - 1) && (pageI === data.pages.length - 1)
              return <AnimeCard cardRef={isLast ? lastAnimeElement : null} key={anime.mal_id} anime={normalizeAnime(anime)} />
            })}
          </Fragment>
        ))}
        {isFetching && <AnimeCardSkeletons />}
      </div>
    </div>
  )
}
