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
        const entries = await db.entries.findAll({
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

        let entryCount = await db.entries.count({
            where: {
                userId: req.user!.id,
            },
        })

        try {
            const [entry, entryCreated] = await db.entries.findOrCreate({
                where: { userId: req.user!.id, gameId: game.id },
                defaults: {
                    // Order is 0 indexed, count is not
                    customOrder: entryCount,
                    isStarred: false,
                    isOwned: false,
                    isPlaying: false,
                },
                // Check for soft deleted entries to restore
                paranoid: false,
            })

            if (entry.isSoftDeleted()) {
                await entry.restore()
            } else {
                // Game already in user's list
                if (!entryCreated) {
                    res.sendStatus(409)
                    return
                }
            }

            if (entry) {
                res.sendStatus(200)
                return
            }
        } catch (error: unknown) {
            let name
            if (error instanceof Error) name = error.name

            // This should be handled by using findOrCreate
            if (name === 'SequelizeUniqueConstraintError') {
                res.sendStatus(409)
                return
            } else {
                res.sendStatus(500)
                return
            }
        }
    }
)

router.patch(
    '/list/:entryId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const entryId = req.params.entryId
        // Can be undefined or string: "true" | "false"
        const owned =
            req.body.owned /* "true" */ || req.body.unown /* "false" */
        const starred = req.body.starred || req.body.unstar

        // Add properties sent in request to be updated.
        const updates = {
            ...(owned && { isOwned: owned === 'true' }),
            ...(starred && { isStarred: starred === 'true' }),
        }
        try {
            const [updated] = await db.entries.update(updates, {
                where: { id: entryId },
            })

            if (updated) {
                res.sendStatus(204)
                return
            } else {
                res.sendStatus(404)
                return
            }
        } catch (error: unknown) {
            console.error(error)
            res.sendStatus(500)
            return
        }
    }
)

router.delete(
    '/list/:entryId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            // Soft deletion
            const deleted = await db.entries.destroy({
                where: { id: req.params.entryId },
            })

            if (deleted) {
                res.sendStatus(204)
                return
            } else {
                res.sendStatus(404)
                return
            }
        } catch (error: unknown) {
            console.error(error)
            res.sendStatus(500)
            return
        }
    }
)

export default router
