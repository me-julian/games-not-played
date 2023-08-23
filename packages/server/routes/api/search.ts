import express from 'express'
import { Router } from 'express'
import { RAWG } from '@games-not-played/types'

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

    const response = await fetch(url, {
        method: 'get',
    })

    if (response.ok) {
        const data = (await response.json()) as RAWG.SearchResults
        res.send(data)
    } else if (response.status === 404) {
        res.sendStatus(404)
    } else {
        console.error(
            `\nError: RAWG request to ${url} returned status code ${response.status}\n`
        )
        res.sendStatus(500)
    }
})

export default router
