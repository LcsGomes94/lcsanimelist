import { useInfiniteQuery } from 'react-query'
import z from 'zod'
import { useSearch } from '../contexts/SearchContext'

const animeDataValidator = z.object({
    pagination: z.object({
        has_next_page: z.boolean(),
        items: z.object({
            total: z.number()
        })
    }),
    data: z.array(z.object({
        mal_id: z.number(),
        images: z.object({
            jpg: z.object({
                image_url: z.string()
            })
        }),
        title: z.string(),
        episodes: z.number().nullable(),
        aired: z.object({
            from: z.string().nullable()
        }),
        score: z.number().nullable(),
        synopsis: z.string().nullable(),
        genres: z.array(z.object({
            name: z.string()
        }))
    }))
})

export function useAnimesSeasonalData() {
    const { seasonal } = useSearch()

    async function fetchAnimes({ pageParam = 1 }) {
        const query = `https://api.jikan.moe/v4/seasons/${seasonal.year}/${seasonal.season}?page=${pageParam}`
        const response = await (await fetch(query)).json()

        return animeDataValidator.parse(response)
    }

    return (
        useInfiniteQuery(['seasonal', seasonal], fetchAnimes, {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.pagination.has_next_page) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            },
            staleTime: 24 * 60 * 60 * 1000,
            cacheTime: 24 * 60 * 60 * 1000
        })
    )
}