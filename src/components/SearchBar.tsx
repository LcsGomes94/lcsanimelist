import { useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "../assets";
import { useSearch } from "../contexts/SearchContext";
import { useAnimesHintData } from "../hooks/useAnimesHintData";
import SearchHistory from "./SearchHistory";
import { useRouter } from 'next/router'
import z from 'zod'
import { useFavorite } from "../contexts/FavoriteContext";
import { useModal } from "../contexts/ModalContext";

type SearchBarProps = {
    className?: string
}

export default function SearchBar({ className }: SearchBarProps) {
    const { inputValue, handleInputValue, clearInputValue, handleSearch, displayItemIndex, originalInputValue, historyItemsToDisplay,
        handleDisplayItemIndex, handleOriginalInputValue, updateInputValue } = useSearch()
    const inputElement = useRef<HTMLInputElement>(null)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const { data: animeHintData } = useAnimesHintData()
    const { favoritedAnimes, resetPage } = useFavorite()
    const { isSearchModalOpen, handleCloseSearchModal } = useModal()
    const router = useRouter()

    // Removes excess spaces it may contains
    const fixedInputValue = inputValue.replace(/^\s+|\s{2,}|\s+$/g, ' ').trim()

    const animeHintDataValidator = z.array(z.object({ title: z.string(), type: z.union([z.literal('new'), z.literal('old')]) }))
    const regex = new RegExp(`.*${displayItemIndex !== 0 ? originalInputValue : fixedInputValue}.*`, 'i')

    function itemsToDisplay() {
        let typedFavoritedAnimes: { title: string, type: 'new' }[] = []
        let typedAnimeHintData: { title: string, type: string }[] = []

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

        if (animeHintData) {
            typedAnimeHintData = [...animeHintData.data.map(anime => ({ title: anime.title, type: 'new' }))]
        }
        const finalDisplayArray: { title: string, type: string }[] = []
        historyItemsToDisplay().forEach(item => finalDisplayArray.push(item))

        if (!inputValue) {
            return finalDisplayArray
        }

        typedAnimeHintData.forEach(hint => {
            if (!finalDisplayArray.some(item => item.title.toLowerCase() === hint.title.toLowerCase())) {
                finalDisplayArray.push(hint)
            }
        })

        return finalDisplayArray.splice(0, 10)
    }

    function handleOnKeyDown(key: string, ctrl: boolean) {
        const displayArray = itemsToDisplay()
        if (key === 'Enter') {
            handleSearch(inputElement)
            resetPage()
            handleCloseSearchModal()
            displayItemIndex !== 0 && handleDisplayItemIndex('reset')
            originalInputValue !== '' && handleOriginalInputValue('')
        } else if (key === 'ArrowDown') {
            displayItemIndex === 0 && handleOriginalInputValue(inputValue)
            if (displayArray.length > displayItemIndex) {
                updateInputValue(displayArray[displayItemIndex].title)
                handleDisplayItemIndex('next')
            }
        } else if (key === 'ArrowUp') {
            if (displayItemIndex > 0) {
                if (displayItemIndex === 1) {
                    updateInputValue(originalInputValue)
                    handleDisplayItemIndex('previous')
                } else if (displayItemIndex > 1) {
                    updateInputValue(displayArray[displayItemIndex - 2].title)
                    handleDisplayItemIndex('previous')
                }
            }
        } else if (key !== 'Alt' && key !== 'AltGraph' && key !== 'Control' && key !== 'Shift' && key !== 'CapsLock' && key !== 'NumLock' &&
            key !== 'ArrowLeft' && key !== 'ArrowRight' && !(ctrl && (key === 'a' || key === 'c'))) {
            displayItemIndex !== 0 && handleDisplayItemIndex('reset')
            originalInputValue !== '' && handleOriginalInputValue('')
        }
    }

    return (
        <div className={`flex justify-center pl-3 md:px-5 lg:px-12 basis-0 grow-[2] relative ${className}`} >
            <div className={`relative max-w-[600px] w-full`}>
                <div className={`flex grow`}>
                    <input onKeyDown={(e) => {
                        e.key === 'ArrowUp' && e.preventDefault()
                        handleOnKeyDown(e.key, e.ctrlKey)
                    }}
                        disabled={router.asPath === '/seasonal'}
                        autoFocus={!className}
                        ref={inputElement} value={inputValue} type="text" placeholder="Search"
                        className={`w-full h-10 lg:h-11 pl-5 lg:pl-6 pr-1.5 pb-0.5 border border-r-0 border-gray-300 dark:border-gray-500 dark:text-gray-300 text-gray-600 bg-inherit dark:placeholder:opacity-50 rounded-full rounded-r-none disabled:opacity-40 disabled:cursor-not-allowed`}
                        onChange={handleInputValue} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} />
                    {inputValue.length >= 1 &&
                        <button onClick={() => clearInputValue(inputElement)} className={`flex items-center pr-5 lg:pr-6 border-y border-gray-300 dark:border-gray-500 group`}>
                            <div className={`text-gray-300 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300`} >
                                <CloseIcon className={`h-[19px] w-[19px] lg:h-[21px] lg:w-[21px]`} />
                            </div>
                        </button>}
                    <div className={`flex border-y border-gray-300 dark:border-gray-500 ${router.asPath === '/seasonal' ? 'opacity-40' : ''}`}>
                        <div className={`h-7 lg:h-8 bg-gray-300 dark:bg-gray-500 w-[1px] self-center`} />
                    </div>
                </div>
                {!isSearchModalOpen && isInputFocused &&
                    <SearchHistory />}
            </div>
            <button className="border border-l-0 rounded-r-full border-gray-300 dark:border-gray-500 px-5 lg:px-6 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-inherit dark:disabled:hover:bg-inherit"
                onClick={() => {
                    handleSearch(inputElement)
                    resetPage()
                    handleCloseSearchModal()
                }}
                disabled={router.asPath === '/seasonal'} >
                <SearchIcon className={`h-[19px] lg:h-[21px] w-[19px] lg:w-[21px]`} />
            </button>
        </div>
    )
}