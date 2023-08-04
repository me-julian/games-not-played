import express from 'express'
import { Router } from 'express'

const router: Router = express.Router()

router.get('/search', async (req, res) => {
    const query = req.query.search

    const rawgRes = await fetch(
        'http://localhost:5000/mockrawg/games?key=search=' + query,
        {
            method: 'get',
        }
    )

    if (rawgRes.ok) {
        res.send(await rawgRes.json())
    }
})

export default router
