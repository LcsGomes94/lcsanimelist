import { Fragment, useRef, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import AnimeCardSkeletons from "../components/AnimeCardSkeletons";
import AnimesShowing from "../components/AnimesShowing";
import AnimesShowingSkeleton from "../components/AnimesShowingSkeleton";
import GenreFilterGroup from "../components/GenreFilterGroup";
import GenresDropdown from "../components/GenresDropdown";
import OrderByDropdown from "../components/OrderByDropdown";
import { useFavorite } from "../contexts/FavoriteContext";
import { useMenu } from "../contexts/MenuContext";
import { useAnimesDisplayData } from "../hooks/useAnimesDisplayData";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useAnimesDisplayData()
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
    <div className={`mt-20 pt-4 pr-3 pl-14 gap-2 ${isMenuOpen ? 'ml-52' : 'ml-[3.375rem]'}`}>
      <div className={`flex items-center justify-start pr-11 w-full`}>
        <div className={`flex flex-1 min-w-0 items-center gap-3 pr-3`}>
          <OrderByDropdown />
          <GenresDropdown />
          <GenreFilterGroup />
        </div>
        {isFetching ? <AnimesShowingSkeleton /> : <AnimesShowing />}
      </div>

      <div className={`flex flex-wrap justify-center gap-x-5 gap-y-12 pr-11 pt-11 pb-16`}>
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