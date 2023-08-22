import express from 'express'
import { Router } from 'express'

// Not exhaustive of everything actually sent by RAWG.
type RawgGame = {
    id: number
    name: string
    background_image: string
    playtime: number
    updated: string
    saturated_color: string
    dominant_color: string
}

type RawgSearchResults = {
    count: number
    next: string | null
    previous: string | null
    results: RawgGame[]
}

async function requestRawgGameSearch(url: string) {
    const response = await fetch(url, {
        method: 'get',
    })
    if (response.ok) {
        return (await response.json()) as RawgSearchResults
    } else {
        throw new Error(response.status.toString())
    }
}

const router: Router = express.Router()

router.get('/search', async (req, res) => {
    const query = req.query.search
    const page = req.query.page

    const baseUrl = `${process.env.RAWG_URL}/games?key=${process.env.RAWG_API_TOKEN}`
    const dynamicQueries = `&page=${
        page ? page : 1
    }&page_size=10&search=${query}`

    try {
        const responseData = await requestRawgGameSearch(
            baseUrl + dynamicQueries
        )

        if (responseData.count === 0) {
            res.send(404)
        }

        res.send(responseData.results.slice(0, 10))
    } catch (error) {
        console.error(
            `\nError: RAWG request to ${
                baseUrl + dynamicQueries
            } returned status code ${error}\n`
        )
        res.sendStatus(500)
    }
})

export default router
