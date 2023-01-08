import { useRef, useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import AnimesShowing from "../components/AnimesShowing";
import EditModal from "../components/EditModal";
import GenreFilterGroup from "../components/GenreFilterGroup";
import GenresDropdown from "../components/GenresDropdown";
import OrderByDropdown from "../components/OrderByDropdown";
import { useFavorite } from "../contexts/FavoriteContext";
import { useMenu } from "../contexts/MenuContext";
import { useModal } from "../contexts/ModalContext";
import { useSearch } from "../contexts/SearchContext";

export default function Finished() {
  const [hasMore, setHasMore] = useState(false)

  const { filterFavorite, loadMore, page } = useFavorite()
  const { favoritedSearchQuery, orderBy, genresFilter, handleSetOrderBy } = useSearch()
  const { isMenuOpen } = useMenu()
  const { isEditModalOpen } = useModal()

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
  },[hasMore, page])

  useEffect(() => {
    handleSetOrderBy('Tier')
  }, [])

  function favoriteList() {
    const filteredAnimes = filterFavorite('finished', favoritedSearchQuery, genresFilter, orderBy)
    if (filteredAnimes.length > page * 24 && hasMore === false) {
      setHasMore(true)
    } else if (filteredAnimes.length <= page * 24 && hasMore === true) {
      setHasMore(false)
    }

    return filteredAnimes.splice(0, page * 24)
  }

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
        {favoriteList().map((anime, animeI, array) => {
          const isLast = animeI === array.length - 1
          return <AnimeCard cardRef={isLast ? lastAnimeElement : null} key={anime.mal_id} anime={anime} />
        })}
      </div>
      {isEditModalOpen && <EditModal />}
    </div>
  )
}
