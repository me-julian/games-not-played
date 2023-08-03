import express from 'express'
import { Router } from 'express'

const router: Router = express.Router()

const games = [
    {
        id: 11,
        name: 'Dark Souls',
        playtime: 30,
    },
    {
        id: 22,
        name: 'Factorio',
        playtime: 66,
        background_image:
            'https://dummyimage.com/600x400/c23447/ffffff.jpg&text=factorio',
    },
    {
        id: 33,
        name: 'FTL: Faster Than Light',
        playtime: 14,
        background_image:
            'https://dummyimage.com/600x400/c23447/ffffff.jpg&text=+FTL:+Faster+Than+Light',
    },
    {
        id: 44,
        name: 'Kingdom Come: Deliverance',
        playtime: 38,
        background_image:
            'https://dummyimage.com/600x400/c23447/ffffff.jpg&text=Kingdom+Come:+Deliverance',
    },
    {
        id: 55,
        name: 'Persona 4: Golden',
        playtime: 45,
        background_image:
            'https://dummyimage.com/600x400/c23447/ffffff.jpg&text=Persona+4:+Golden',
    },
]

router.get('/games/:query', (req, res) => {
    res.send(games)
})

router.get('/games/:id', (req, res) => {
    let game
    switch (req.params.id) {
        case '11':
            game = games[0]
            break
        case '22':
            game = games[1]
            break
        case '33':
            game = games[2]
            break
        case '44':
            game = games[3]
            break
        case '55':
            game = games[4]
            break
    }

    if (game) {
        res.send(game)
    } else {
        res.sendStatus(404)
    }
})

export default router
