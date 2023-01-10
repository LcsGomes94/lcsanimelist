import { useRef, useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import AnimesShowing from "../components/AnimesShowing";
import GenreFilterGroup from "../components/GenreFilterGroup";
import GenresDropdown from "../components/GenresDropdown";
import MoveModal from "../components/MoveModal";
import OrderByDropdown from "../components/OrderByDropdown";
import SearchModal from "../components/SearchModal";
import UserModal from "../components/UserModal";
import { useFavorite } from "../contexts/FavoriteContext";
import { useMenu } from "../contexts/MenuContext";
import { useModal } from "../contexts/ModalContext";
import { useSearch } from "../contexts/SearchContext";

export default function WatchList() {
  const [hasMore, setHasMore] = useState(false)

  const { filterFavorite, loadMore, page } = useFavorite()
  const { favoritedSearchQuery, orderBy, genresFilter, handleSetOrderBy } = useSearch()
  const { isMenuOpen } = useMenu()
  const { isMoveModalOpen } = useModal()
  const { isSearchModalOpen, isUserModalOpen } = useModal()

  const observer = useRef<IntersectionObserver | null>(null)
  const lastAnimeElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasMore) {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMore()
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
  }, [hasMore, page])

  useEffect(() => {
    orderBy !== 'Score' && handleSetOrderBy('Score')
  }, [])

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
    <div className={`mt-14 md:mt-20 pt-1.5 md:pt-4 px-4 md:pr-3 md:pl-8 lg:pl-14 gap-2 md:ml-[4.25rem] ${isMenuOpen ? 'lg:ml-52' : 'lg:ml-[3.375rem]'}`}>
      <div className={`flex items-center justify-start md:pr-2 lg:pr-11 w-full`}>
        <div className={`flex flex-1 min-w-0 items-center gap-2.5 md:gap-3 pr-3 z-20`}>
          <OrderByDropdown />
          <GenresDropdown />
          <GenreFilterGroup className={`hidden md:flex`} />
        </div>
        <AnimesShowing className={'hidden'} />
      </div>
      <div>
        <div className={`flex items-center justify-start md:pr-2 lg:pr-11 w-full mt-2.5 md:hidden`}>
          <div className={`flex flex-1 min-w-0 items-center gap-3 pr-3`}>
            <GenreFilterGroup />
          </div>
          <AnimesShowing />
        </div>
      </div>

      <div className={`flex flex-wrap justify-center gap-x-5 gap-y-7 md:gap-y-12 md:pr-1.5 lg:pr-11 pt-4 md:pt-11 pb-24 md:pb-16`}>
        {favoriteList().map((anime, animeI, array) => {
          const isLast = animeI === array.length - 1
          return <AnimeCard cardRef={isLast ? lastAnimeElement : null} key={anime.mal_id} anime={anime} />
        })}
      </div>
      {isMoveModalOpen && <MoveModal />}
      {isSearchModalOpen && <SearchModal />}
      {isUserModalOpen && <UserModal />}
    </div>
  )
}
