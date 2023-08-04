import express from 'express'
import { Router } from 'express'
import db from '../../db/db'
import passport from 'passport'
import Game from '../../db/models/Game'

const router: Router = express.Router()

router.get(
    '/list',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const entries = await db.backlogEntries.findAll({
            where: { userId: req.user!.id },
            include: Game,
        })

        res.send(entries)
    }
)

router.post(
    '/list/add',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const playtime = req.body.playtime
        const backgroundImage = req.body.backgroundImage

        const [game, gameCreated] = await db.games.findOrCreate({
            where: { id: req.body.id },
            defaults: {
                name: req.body.name,
                playtime: playtime ? req.body.playtime : null,
                backgroundImage: backgroundImage
                    ? req.body.backgroundImage
                    : null,
            },
        })

        if (!gameCreated) {
            // Check if cached game in db needs to be refreshed
        }

        let entryCount = await db.backlogEntries.count({
            where: {
                userId: req.user!.id,
            },
        })

        // Catch error if user clicks on a game that's
        // already in their list.
        try {
            const entry = await db.backlogEntries.create({
                userId: req.user!.id,
                gameId: game.id,
                // Order is 0 indexed, count is not
                customOrder: entryCount,
                isStarred: false,
                isOwned: false,
                isPlaying: false,
            })

            if (entry) {
                res.sendStatus(200)
            }
        } catch (error) {
            // Improve this
            if (error instanceof Error) {
                console.error(error)
                if (error.name === 'SequelizeUniqueConstraintError') {
                    res.sendStatus(409)
                } else {
                    res.sendStatus(500)
                }
            } else {
                res.sendStatus(500)
            }
        }
    }
)

export default router
