import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ChangeEvent, createContext, ReactNode, RefObject, useContext, useEffect, useState } from 'react'

type SearchContextProviderProps = {
    children: ReactNode
}

type SearchContextType = {
    inputValue: string
    handleInputValue: (e: ChangeEvent<HTMLInputElement>) => void
    clearInputValue: (inputElement?: RefObject<HTMLInputElement>) => void
    handleSelectSearchItem: (newValue: string) => void
    handleSearch: (inputElement: RefObject<HTMLInputElement>) => void
    historyItemsToDisplay: () => { title: string, type: 'old' | 'new' }[] | []
    orderBy: 'Score' | 'Title' | 'Tier'
    genresFilter: string
    handleSetOrderBy: (order: 'Score' | 'Title' | 'Tier') => void
    searchAnimeDisplayQuery: string
    searchAnimeHintQuery: string
    displayItemIndex: number
    originalInputValue: string
    handleDisplayItemIndex: (value: 'next' | 'previous' | 'reset') => void
    handleOriginalInputValue: (str: string) => void
    updateInputValue: (str: string) => void
    resetSearchStates: () => void
    favoritedSearchQuery: string
    seasonal: seasonalType
    handleSetSeasonal: (seasonal: seasonalType) => void
    handleSetGenresFilter: (genre: string) => void
    handleRemoveGenreFilter: (genre: string) => void
}

type seasonalType = {
    year: number,
    season: 'Winter' | 'Spring' | 'Summer' | 'Fall'
}

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1

let currentSeason: 'Winter' | 'Spring' | 'Summer' | 'Fall'
if (currentMonth >= 1 && currentMonth <= 3) {
    currentSeason = 'Winter'
} else if (currentMonth >= 4 && currentMonth <= 6) {
    currentSeason = 'Spring'
} else if (currentMonth >= 7 && currentMonth <= 9) {
    currentSeason = 'Summer'
} else {
    currentSeason = 'Fall'
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType)

export function SearchContextProvider({ children }: SearchContextProviderProps) {
    const { data: session, status } = useSession()

    const [inputValue, setInputValue] = useState('')
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const [orderBy, setOrderBy] = useState<'Score' | 'Title' | 'Tier'>('Score')
    const [genresFilter, setGenresFilter] = useState('')
    const [searchAnimeHintQuery, setSearchAnimeHintQuery] = useState('')
    const [searchAnimeDisplayQuery, setSearchAnimeDisplayQuery] = useState('')
    const [displayItemIndex, setDisplayItemIndex] = useState(0)
    const [originalInputValue, setOriginalInputValue] = useState('')
    const [favoritedSearchQuery, setFavoritedSearchQuery] = useState('')
    const [seasonal, setSeasonal] = useState<seasonalType>({ year: currentYear, season: currentSeason })

    const router = useRouter()

    // Removes excess spaces it may contains
    const fixedInputValue = inputValue.replace(/^\s+|\s{2,}|\s+$/g, ' ').trim()

    // Removes excess spaces, check for duplicity and make sure the item is on top of the list
    function addHistoryItem(item: string) {
        let fixedItem = item.replace(/^\s+|\s{2,}|\s+$/g, ' ').trim()
        const index = searchHistory.map(item => item.toLowerCase()).indexOf(fixedItem.toLocaleLowerCase())
        if (index !== -1) {
            setSearchHistory(prevItems => {
                const newItems = [...prevItems]
                newItems.splice(index, 1)
                return [fixedItem, ...newItems]
            })
        } else {
            setSearchHistory(prevItems => [fixedItem, ...prevItems])
        }
    }

    // Update localStorage to sync it to state
    useEffect(() => {
        status !== 'loading' && localStorage.setItem(session?.user?.email + '_SEARCH_HISTORY', JSON.stringify(searchHistory))
    }, [searchHistory])

    // Update state to sync it to localStorage
    useEffect(() => {
        if (status !== 'loading') {
            const storedSearchHistory = localStorage.getItem(session?.user?.email + '_SEARCH_HISTORY')
            storedSearchHistory !== null ? setSearchHistory(JSON.parse(storedSearchHistory)) : undefined
        }
    }, [status])

    // Handles updating searchAnimeHintQuery using bounce to trigger data fetch avoiding reaching api request limit
    useEffect(() => {
        if (router.asPath === '/') {
            const getAnimeHintData = setTimeout(() => {
                originalInputValue === '' && displayItemIndex === 0 && setSearchAnimeHintQuery(inputValue)
            }, 334)

            return () => clearTimeout(getAnimeHintData)
        }
    }, [inputValue])

    function handleInputValue(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function clearInputValue(inputElement?: RefObject<HTMLInputElement>) {
        inputElement?.current?.focus()
        setInputValue('')
        displayItemIndex !== 0 && handleDisplayItemIndex('reset')
        originalInputValue !== '' && handleOriginalInputValue('')
    }

    function handleSetOrderBy(order: 'Score' | 'Title' | 'Tier') {
        setOrderBy(order)
    }

    function handleSelectSearchItem(newValue: string) {
        setInputValue(newValue)
        router.asPath === '/' && addHistoryItem(newValue)
        router.asPath === '/' ? setSearchAnimeDisplayQuery(newValue) : setFavoritedSearchQuery(newValue)
    }

    function handleSearch(inputElement: RefObject<HTMLInputElement>) {
        if (router.asPath === '/') {
            if (fixedInputValue.length >= 3) {
                addHistoryItem(inputValue)
                setSearchAnimeDisplayQuery(inputValue)
            } else {
                setSearchAnimeDisplayQuery(inputValue)
            }
        } else {
            setFavoritedSearchQuery(inputValue)
        }
        inputElement.current?.blur()
    }

    function historyItemsToDisplay() {
        const regex = new RegExp(`.*${displayItemIndex !== 0 ? originalInputValue : fixedInputValue}.*`, 'i')
        const typedSearchHistory: { title: string, type: 'old' }[] = searchHistory.map(item => ({ title: item, type: 'old' }))
        return typedSearchHistory.filter(str => regex.test(str.title)).splice(0, 10)
    }

    function handleDisplayItemIndex(value: 'next' | 'previous' | 'reset') {
        value === 'next' ? setDisplayItemIndex(displayItemIndex + 1) :
            value === 'previous' ? setDisplayItemIndex(displayItemIndex - 1) :
                setDisplayItemIndex(0)
    }

    function handleOriginalInputValue(str: string) {
        setOriginalInputValue(str)
    }

    function updateInputValue(str: string) {
        setInputValue(str)
    }

    function resetSearchStates() {
        if (router.asPath === '/finished' || router.asPath === '/dropped') {
            orderBy !== 'Tier' && setOrderBy('Tier')
        } else {
            orderBy !== 'Score' && setOrderBy('Score')
        }
        inputValue !== '' && setInputValue('')
        genresFilter !== '' && setGenresFilter('')
        searchAnimeHintQuery !== '' && setSearchAnimeHintQuery('')
        searchAnimeDisplayQuery !== '' && setSearchAnimeDisplayQuery('')
        displayItemIndex !== 0 && setDisplayItemIndex(0)
        originalInputValue !== '' && setOriginalInputValue('')
        favoritedSearchQuery !== '' && setFavoritedSearchQuery('');
        (seasonal.year !== currentYear || seasonal.season !== currentSeason) && setSeasonal({ year: currentYear, season: currentSeason })
    }

    function handleSetSeasonal(seasonal: seasonalType) {
        setSeasonal(seasonal)
    }

    function handleSetGenresFilter(genre: string) {
        if (genresFilter.split(',').length < 5) {
            genre && genresFilter ? setGenresFilter(`${genresFilter},${genre}`) : setGenresFilter(genre)
        }
    }

    function handleRemoveGenreFilter(genre: string) {
        const genreList = genresFilter.split(',')
        const filteredGenres = genreList.filter((g) => g !== genre)
        let newGenres = filteredGenres.join(',')

        if (newGenres.startsWith(',')) {
            newGenres = newGenres.substring(1)
        }
        if (newGenres.endsWith(',')) {
            newGenres = newGenres.substring(0, newGenres.length - 1)
        }

        setGenresFilter(newGenres)
    }

    return (
        <SearchContext.Provider value={{
            inputValue, handleInputValue, clearInputValue, handleSelectSearchItem, handleSearch,
            historyItemsToDisplay, orderBy, genresFilter, handleSetOrderBy, searchAnimeDisplayQuery,
            searchAnimeHintQuery, displayItemIndex, originalInputValue, handleDisplayItemIndex,
            handleOriginalInputValue, updateInputValue, resetSearchStates, favoritedSearchQuery,
            seasonal, handleSetSeasonal, handleSetGenresFilter, handleRemoveGenreFilter
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    return (
        useContext(SearchContext)
    )
}