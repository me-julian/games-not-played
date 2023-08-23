import express from 'express'
import { Router } from 'express'
import { RAWG } from '@games-not-played/types'

async function requestRawgGameSearch(url: string) {
    const response = await fetch(url, {
        method: 'get',
    })
    if (response.ok) {
        return (await response.json()) as RAWG.SearchResults
    } else {
        throw new Error(response.status.toString())
    }
}

const router: Router = express.Router()

router.get('/search', async (req, res) => {
    const query = req.query.search
    const page = req.query.page

    const pageSize = 10

    const urlSections = [
        `${process.env.RAWG_URL}/games?key=${process.env.RAWG_API_TOKEN}`,
        `&page=${page ? page : 1}&page_size=${pageSize}`,
        `&search=${query}`,
        '&search_precise=true',
    ]

    const url = urlSections.flat().join('')

    try {
        const responseData = await requestRawgGameSearch(url)

        res.send(responseData)
    } catch (error) {
        console.error(
            `\nError: RAWG request to ${url} returned status code ${error}\n`
        )
        res.sendStatus(500)
    }
})

export default router
