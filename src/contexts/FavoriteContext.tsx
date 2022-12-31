import { useSession } from "next-auth/react";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type FavoriteContextProviderProps = {
    children: ReactNode
}

type FavoriteContextType = {
    favoritedAnimes: FavoritedAnimeType[]
    addFavorite: ({ }: NormalizedAnimeType) => void
    removeFavorite: (mal_id: number) => void
    editFavorite: ({ }: FavoritedAnimeType) => void
    isFavorited: (mal_id: number) => boolean
    filterFavorite: (stage: 'watch' | 'finished' | 'dropped', query: string, genres: string, orderBy: 'Score' | 'Title' | 'Tier') => FavoritedAnimeType[]
    page: number
    loadMore: () => void
    resetPage: () => void
    normalizeAnime: ({ }: AnimeDataType) => NormalizedAnimeType
}

type NormalizedAnimeType = {
    mal_id: number
    title: string
    aired: string | 'Unknown'
    episodes: string | 'Unknown'
    genres: string[]
    imageUrl: string
    synopsis: string
    score: number | 'N/A'
}

type FavoritedAnimeType = {
    stage: 'watch' | 'finished' | 'dropped'
    personalNote: string
    personalTier: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | null
} & NormalizedAnimeType

type AnimeDataType = {
    mal_id: number
    images: {
        jpg: {
            image_url: string
        }
    }
    title: string
    episodes: number | null
    aired: {
        from: string | null
    }
    score: number | null
    synopsis: string | null
    genres: {
        name: string
    }[]
}

const FavoriteContext = createContext<FavoriteContextType>({} as FavoriteContextType)

export function FavoriteContextProvider({ children }: FavoriteContextProviderProps) {
    const [favoritedAnimes, setFavoritedAnimes] = useState<FavoritedAnimeType[]>([])
    const [page, setPage] = useState(1)
    const { data: session, status } = useSession()

    // Update localStorage to sync it to state
    useEffect(() => {
        status !== 'loading' && localStorage.setItem(session?.user?.email + '_FAVORITED_ANIMES', JSON.stringify(favoritedAnimes))
    }, [favoritedAnimes])

    // Update state to sync it to localStorage
    useEffect(() => {
        if (status !== 'loading') {
            const storedFavoritedAnimes = localStorage.getItem(session?.user?.email + '_FAVORITED_ANIMES')
            storedFavoritedAnimes !== null ? setFavoritedAnimes(JSON.parse(storedFavoritedAnimes)) : undefined
        }
    }, [status])

    function addFavorite({ mal_id, title, aired, episodes, genres, imageUrl, synopsis, score }: NormalizedAnimeType) {
        const animeData: FavoritedAnimeType = { mal_id, title, aired, episodes, genres, imageUrl, synopsis, score, stage: 'watch', personalNote: '', personalTier: null }

        setFavoritedAnimes([animeData, ...favoritedAnimes].sort((a, b) => {
            const aScore = typeof a.score === 'number' ? a.score : 0;
            const bScore = typeof b.score === 'number' ? b.score : 0;

            return bScore - aScore;
        }))
    }

    function normalizeAnime({ mal_id, images: { jpg: { image_url: imageUrl } }, title, episodes: eps, aired: { from }, score: a_score, synopsis: a_synopsis, genres: a_genres }: AnimeDataType) {
        const aired = from ? new Date(from).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : 'Unknown'
        const episodes = eps ? `${eps} ${eps === 1 ? 'episode' : 'episodes'}` : 'Unknown'
        const score = a_score || 'N/A'
        const synopsis = a_synopsis || ''
        const genres = a_genres.map(obj => obj.name)

        const animeData: NormalizedAnimeType = { mal_id, title, aired, episodes, genres, imageUrl, synopsis, score }

        return animeData
    }

    function removeFavorite(mal_id: number) {
        setFavoritedAnimes(favoritedAnimes.filter(anime => anime.mal_id !== mal_id))
    }

    function editFavorite({ mal_id, stage, personalTier, personalNote }: FavoritedAnimeType) {
        setFavoritedAnimes(favoritedAnimes.map(anime => {
            return anime.mal_id === mal_id ? {
                ...anime,
                stage,
                personalTier,
                personalNote
            } : anime
        }))
    }

    function filterFavorite(stage: 'watch' | 'finished' | 'dropped', query: string, genres: string, orderBy: 'Score' | 'Title' | 'Tier') {
        let filteredAnimes = favoritedAnimes.filter(anime => (
            anime.stage === stage && anime.title.toLowerCase().includes(query.toLowerCase()) && (genres === '' || genres.split(',').every(genre => anime.genres.includes(genre)))
        ))

        if (orderBy === 'Score') {
            return filteredAnimes.sort((a, b) => {
                if (a.score === 'N/A' && b.score === 'N/A') {
                    return 0
                }
                if (a.score === 'N/A') {
                    return 1
                }
                if (b.score === 'N/A') {
                    return -1
                }
                return b.score - a.score
            })
        } else if (orderBy === 'Title') {
            return filteredAnimes.sort((a, b) => a.title.localeCompare(b.title))
        } else {
            return filteredAnimes.sort((a, b) => {
                if (a.personalTier === b.personalTier) {
                    if (a.score === 'N/A' && b.score === 'N/A') {
                        return 0
                    }
                    if (a.score === 'N/A') {
                        return 1
                    }
                    if (b.score === 'N/A') {
                        return -1
                    }
                    return b.score - a.score;
                }

                if (a.personalTier === null) {
                    return 1
                }
                if (b.personalTier === null) {
                    return -1
                }

                switch (a.personalTier) {
                    case 'SS': return -1
                    case 'S': return b.personalTier === 'SS' ? 1 : -1
                    case 'A': return ['SS', 'S'].includes(b.personalTier) ? 1 : -1
                    case 'B': return ['SS', 'S', 'A'].includes(b.personalTier) ? 1 : -1
                    case 'C': return ['SS', 'S', 'A', 'B'].includes(b.personalTier) ? 1 : -1
                    case 'D': return ['SS', 'S', 'A', 'B', 'C'].includes(b.personalTier) ? 1 : -1
                    case 'E': return ['SS', 'S', 'A', 'B', 'C', 'D'].includes(b.personalTier) ? 1 : -1
                }

            })
        }
    }

    function isFavorited(mal_id: number) {
        return favoritedAnimes.some(anime => anime.mal_id === mal_id)
    }

    function loadMore() {
        setPage(page + 1)
    }

    function resetPage() {
        setPage(1)
    }

    return (
        <FavoriteContext.Provider value={{ favoritedAnimes, addFavorite, removeFavorite, editFavorite, isFavorited, filterFavorite, page, loadMore, resetPage, normalizeAnime }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export function useFavorite() {
    return (
        useContext(FavoriteContext)
    )
}