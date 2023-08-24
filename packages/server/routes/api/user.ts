import express from 'express'
import { Router } from 'express'
import db from '../../db/db'
import passport from 'passport'
import Game from '../../db/models/Game'
import config from '../../config'

const router: Router = express.Router()

router.get(
    '/list',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const entries = await db.entries.findAll({
            where: { userId: req.user!.id },
            include: Game,
            order: [['order', 'ASC']],
        })

        res.send(entries)
    }
)

router.patch(
    '/list',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        let { startIndex, endIndex } = req.body

        if (!startIndex || !endIndex) {
            res.sendStatus(400)
            return
        }

        const t = await db.sequelize.transaction()
        try {
            await db.entries.moveOne(
                parseInt(req.user!.id),
                parseInt(startIndex),
                parseInt(endIndex),
                t
            )

            await t.commit()
            res.sendStatus(204)
            return
        } catch (error) {
            await t.rollback()
            console.error(error)
            res.sendStatus(500)
            return
        }
    }
)

router.post(
    '/list',
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
            const dayMs = 1000 * 60 * 60 * 24
            const rawgUpdatedAt = new Date(req.body.updated)
            if (
                rawgUpdatedAt.getTime() - game.updatedAt.getTime() >
                config.refreshInterval * dayMs
            ) {
                await game.update({
                    name: req.body.name,
                    playtime: playtime,
                    backgroundImage: backgroundImage,
                    updatedAt: new Date(),
                })
            }
        }

        let entryCount = await db.entries.count({
            where: {
                userId: req.user!.id,
            },
        })

        const t = await db.sequelize.transaction()
        try {
            const [entry, entryCreated] = await db.entries.findOrCreate({
                where: { userId: req.user!.id, gameId: game.id },
                defaults: {
                    // Order is 0 indexed, count is not
                    order: entryCount,
                    isStarred: false,
                    isOwned: false,
                    isPlaying: false,
                },
                // Check for soft deleted entries to restore
                paranoid: false,
                transaction: t,
            })

            if (entry.isSoftDeleted()) {
                await entry.restore({ transaction: t })
            } else {
                // Game already in user's list
                if (!entryCreated) {
                    await t.commit()
                    res.sendStatus(409)
                    return
                }
            }

            if (entry) {
                await t.commit()
                res.sendStatus(200)
                return
            }
        } catch (error: unknown) {
            await t.rollback()
            console.error(error)
            res.sendStatus(500)
            return
        }
    }
)

router.patch(
    '/list/:entryId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const entryId = req.params.entryId
        // Can be undefined or string: "true" | "false"
        const playing =
            req.body.playing /* "true" */ || req.body.unplaying /* "false" */
        const owned = req.body.owned || req.body.unowned
        const starred = req.body.starred || req.body.unstarred

        // Add properties sent in request to be updated.
        const updates = {
            ...(playing && { isPlaying: playing === 'true' }),
            ...(owned && { isOwned: owned === 'true' }),
            ...(starred && { isStarred: starred === 'true' }),
        }

        const t = await db.sequelize.transaction()
        try {
            const entry = await db.entries.findOne({ where: { id: entryId } })

            if (entry) {
                if (playing && playing !== entry.isPlaying.toString()) {
                    await db.entries.moveBetweenPlaying(
                        parseInt(req.user!.id),
                        entry,
                        playing === 'true',
                        t
                    )
                }

                await entry.update(updates, {
                    transaction: t,
                })

                await t.commit()
                res.sendStatus(204)
                return
            } else {
                await t.rollback()
                res.sendStatus(404)
                return
            }
        } catch (error: unknown) {
            await t.rollback()
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
