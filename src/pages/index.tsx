import { Fragment, useRef, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import AnimeCardSkeletons from "../components/AnimeCardSkeletons";
import AnimesShowing from "../components/AnimesShowing";
import AnimesShowingSkeleton from "../components/AnimesShowingSkeleton";
import GenreFilterGroup from "../components/GenreFilterGroup";
import GenresDropdown from "../components/GenresDropdown";
import OrderByDropdown from "../components/OrderByDropdown";
import SearchModal from "../components/SearchModal";
import UserModal from "../components/UserModal";
import { useFavorite } from "../contexts/FavoriteContext";
import { useMenu } from "../contexts/MenuContext";
import { useModal } from "../contexts/ModalContext";
import { useSearch } from "../contexts/SearchContext";
import { useAnimesDisplayData } from "../hooks/useAnimesDisplayData";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useAnimesDisplayData()
  const { normalizeAnime } = useFavorite()
  const { isMenuOpen } = useMenu()
  const { resetSearchStates } = useSearch()
  const { isSearchModalOpen, isUserModalOpen } = useModal()

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

  useEffect(() => {
    resetSearchStates()
  }, [])

  return (
    <div className={`mt-14 md:mt-20 pt-1.5 md:pt-4 px-4 md:pr-3 md:pl-8 lg:pl-14 gap-2 md:ml-[4.25rem] ${isMenuOpen ? 'lg:ml-52' : 'lg:ml-[3.375rem]'}`}>
      <div className={`flex items-center justify-start md:pr-2 lg:pr-11 w-full`}>
        <div className={`flex flex-1 min-w-0 items-center gap-2.5 md:gap-3 pr-3 z-20`}>
          <OrderByDropdown />
          <GenresDropdown />
          <GenreFilterGroup className={`hidden md:flex`} />
        </div>
        {isFetching ? <AnimesShowingSkeleton className={'hidden'} /> : <AnimesShowing className={'hidden'} />}
      </div>
      <div>
        <div className={`flex items-center justify-start md:pr-2 lg:pr-11 w-full mt-2.5 md:hidden`}>
          <div className={`flex flex-1 min-w-0 items-center gap-3 pr-3`}>
            <GenreFilterGroup />
          </div>
          {isFetching ? <AnimesShowingSkeleton /> : <AnimesShowing />}
        </div>
      </div>

      <div className={`flex flex-wrap justify-center gap-x-5 gap-y-7 md:gap-y-12 md:pr-1.5 lg:pr-11 pt-4 md:pt-11 pb-24 md:pb-16`}>
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
      {isSearchModalOpen && <SearchModal />}
      {isUserModalOpen && <UserModal />}
    </div>
  )
}