import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import z from 'zod'
import { useSearch } from '../contexts/SearchContext'

const animeDataValidator = z.object({
    data: z.array(z.object({
        title: z.string()
    }))
})

export function useAnimesHintData() {
    const { searchAnimeHintQuery } = useSearch()
    const route = useRouter()

    async function fetchAnimes() {
        const query = `https://api.jikan.moe/v4/anime?limit=24&order_by=desc&sort=score&q=${searchAnimeHintQuery}`
        const response = await (await fetch(query)).json()

        return animeDataValidator.parse(response)
    }

    return (
        useQuery(['hint', searchAnimeHintQuery], fetchAnimes, {
            staleTime: 24 * 60 * 60 * 1000,
            enabled: searchAnimeHintQuery.length >= 1 && route.asPath === '/'
        })
    )
}