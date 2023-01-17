import { useRouter } from "next/router";
import z from "zod";
import { useFavorite } from "../contexts/FavoriteContext";
import { useSearch } from "../contexts/SearchContext";
import { useAnimesHintData } from "../hooks/useAnimesHintData";
import SearchHistoryItem from "./SearchHistoryItem";

export default function SearchHistory() {
    const { historyItemsToDisplay, inputValue, displayItemIndex, originalInputValue } = useSearch()
    const { data: animeHintData } = useAnimesHintData()
    const { favoritedAnimes } = useFavorite()
    const router = useRouter()

    // Removes excess spaces it may contains
    const fixedInputValue = inputValue.replace(/^\s+|\s{2,}|\s+$/g, ' ').trim()

    const animeHintDataValidator = z.array(z.object({ title: z.string(), type: z.union([z.literal('new'), z.literal('old')]) }))
    const regex = new RegExp(`.*${displayItemIndex !== 0 ? originalInputValue : fixedInputValue}.*`, 'i')

    function itemsToDisplay() {
        let typedFavoritedAnimes: { title: string, type: 'new' }[] = []
        let typedAnimeHintData: { title: string, type: string }[] = []
        const finalDisplayArray: { title: string, type: string }[] = []

        if (router.asPath === '/watch_list') {
            typedFavoritedAnimes = favoritedAnimes.filter(anime => anime.stage === 'watch' && regex.test(anime.title)).map(anime => ({ title: anime.title, type: 'new' }))
            return animeHintDataValidator.parse(typedFavoritedAnimes).splice(0, 10)
        }

        if (router.asPath === '/finished') {
            typedFavoritedAnimes = favoritedAnimes.filter(anime => anime.stage === 'finished' && regex.test(anime.title)).map(anime => ({ title: anime.title, type: 'new' }))
            return animeHintDataValidator.parse(typedFavoritedAnimes).splice(0, 10)
        }

        if (router.asPath === '/dropped') {
            typedFavoritedAnimes = favoritedAnimes.filter(anime => anime.stage === 'dropped' && regex.test(anime.title)).map(anime => ({ title: anime.title, type: 'new' }))
            return animeHintDataValidator.parse(typedFavoritedAnimes).splice(0, 10)
        }

        historyItemsToDisplay().forEach(item => finalDisplayArray.push(item))

        if (animeHintData) {
            typedAnimeHintData = [...animeHintData.data.map(anime => ({ title: anime.title, type: 'new' }))]
        }

        if (!inputValue) {
            return animeHintDataValidator.parse(finalDisplayArray)
        } else {
            typedAnimeHintData.forEach(hint => {
                if (!finalDisplayArray.some(item => item.title.toLowerCase() === hint.title.toLowerCase())) {
                    finalDisplayArray.push(hint)
                }
            })
            return animeHintDataValidator.parse(finalDisplayArray).splice(0, 10)
        }
    }

    return (
        <div className={`flex md:absolute bg-inherit w-full md:border border-t-0 border-gray-200 dark:border-gray-600 md:rounded-3xl min-w-[320px] overflow-hidden ${itemsToDisplay().length === 0 && 'hidden'}`}>
            <ul className={`w-full`}>
                {itemsToDisplay().map((item, i) => <SearchHistoryItem title={item.title} type={item.type} key={item.title + i}
                    selected={inputValue === item.title && displayItemIndex - 1 === i} />)}
            </ul>
        </div>
    )
}