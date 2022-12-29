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

export function useAnimesDisplayData() {
    const { orderBy, genresFilter, searchAnimeDisplayQuery } = useSearch()
    const sort = orderBy === 'Score' ? 'desc' : 'asc'

    function genreId() {
        const genresOptions = ['Action', 'Adventure', 'Avant Garde', 'Award Winning', 'Boys Love', 'Comedy', 'Drama', 'Ecchi', 'Erotica', 'Fantasy', 'Girls Love', 'Gourmet', 'Hentai', 'Horror',
            'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Suspense']
        const genresId = [1, 2, 5, 46, 28, 4, 8, 9, 49, 10, 26, 47, 12, 14, 7, 22, 24, 36, 30, 37, 41]
        const genreList = genresFilter.split(',')
        const idList = genreList.map(genre => {
            const index = genresOptions.indexOf(genre)
            if (index !== -1) {
                return genresId[index]
            } else {
                return ''
            }
        })

        return idList.join(',')
    }

    async function fetchAnimes({ pageParam = 1 }) {
        const query = `https://api.jikan.moe/v4/anime?limit=24&order_by=${orderBy.toLowerCase()}&sort=${sort}&genres=${genreId()}&q=${searchAnimeDisplayQuery}&page=${pageParam}`
        const response = await (await fetch(query)).json()

        return animeDataValidator.parse(response)
    }

    return (
        useInfiniteQuery(['animes', orderBy, genresFilter, searchAnimeDisplayQuery], fetchAnimes, {
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