import { useQuery } from 'react-query'
import z from 'zod'

const seasonDataValidator = z.object({
    data: z.array(z.object({
        year: z.number(),
        seasons: z.array(
            z.union([z.literal('winter'), z.literal('spring'), z.literal('summer'), z.literal('fall')])
        )
    }))
})

export function useSeasonsData() {
    async function fetchSeasons() {
        const query = `https://api.jikan.moe/v4/seasons`
        const response = await (await fetch(query)).json()

        return seasonDataValidator.parse(response).data.splice(0, 3).map(value => ({ year: value.year, seasons: value.seasons.reverse() }))
    }

    return (
        useQuery('seasons', fetchSeasons, {
            staleTime: 24 * 60 * 60 * 1000,
            cacheTime: 24 * 60 * 60 * 1000,

        })
    )
}