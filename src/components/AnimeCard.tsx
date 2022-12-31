import { FavoriteIcon, ScoreIcon } from "../assets";
import { useFavorite } from "../contexts/FavoriteContext";

type AnimeType = {
    mal_id: number
    title: string
    aired: string | 'Unknown'
    episodes: string | 'Unknown'
    genres: string[]
    imageUrl: string
    synopsis: string
    score: number | 'N/A'
    stage?: 'watch' | 'finished' | 'dropped'
    personalNote?: string
    personalTier?: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | null
}

type AnimeCardType = {
    anime: AnimeType
}

export default function AnimeCard({ anime }: AnimeCardType) {
    const { addFavorite, removeFavorite, isFavorited } = useFavorite()

    return (
        <div className={`flex flex-col justify-center flex-1 min-w-[22rem] max-w-[24rem]`}>
            <div className={`flex h-16 items-center justify-center`}>
                <h2 className={`text-center text-2xl text-cyan-700 dark:text-cyan-400 overflow-hidden text-ellipsis line-clamp-2`}>{anime.title}</h2>
            </div>
            <div className={`text-sm flex justify-center items-center gap-4 py-2`}>
                <span>
                    {anime.aired}
                </span>
                <div className={`w-[1px] h-4 bg-gray-200 dark:bg-gray-600`} />
                <span>
                    {anime.episodes}
                </span>
            </div>
            <div className={`bg-gray-200 dark:bg-gray-800 rounded-lg`}>
                <div className={`flex justify-center gap-2.5 py-2 overflow-hidden`}>
                    {anime.genres.slice(0, 4).map(genre => (
                        <div key={genre}
                            className={`flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-700 text-cyan-700 dark:text-cyan-400
                            text-xs h-5 px-2.5 whitespace-nowrap`}>
                            {genre}
                        </div>
                    ))}
                </div>
                <div className={`flex rounded-lg overflow-hidden`}>
                    <div className={`w-1/2 aspect-[167/237]`}>
                        <img src={anime.imageUrl} alt='' className={`h-full w-full`} />
                    </div>
                    <div className={`w-1/2 bg-gray-100 dark:bg-gray-700`}>
                        <div className={`pl-3 pr-1 py-1 dark:text-gray-200`}>
                            <p className={`text-xs leading-5 whitespace-pre-wrap pr-3 overflow-y-auto card-scroll-light dark:card-scroll-dark w-full h-full aspect-[189/254]`}>
                                {anime.synopsis}
                            </p>
                        </div>
                        <div className={`flex justify-around items-center h-9 rounded-tr-lg bg-gray-200 dark:bg-gray-800`}>
                            <div className={`flex items-center gap-1`}>
                                <ScoreIcon />
                                <span className={`text-sm`}>{anime.score}</span>
                            </div>
                            <button className={`p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600`}
                                onClick={() => {
                                    anime.stage || isFavorited(anime.mal_id) ? removeFavorite(anime.mal_id) : addFavorite(anime)
                                }}>
                                <FavoriteIcon isFavorite={anime.stage !== undefined || isFavorited(anime.mal_id) ? true : false} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}