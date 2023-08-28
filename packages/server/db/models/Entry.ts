'use strict'
import {
    Table,
    Column,
    Model,
    ForeignKey,
    AllowNull,
    Index,
    BelongsTo,
    BeforeDestroy,
    AfterRestore,
    AfterDestroy,
} from 'sequelize-typescript'
import { sequelize } from '../db'
import User from './User'
import Game from './Game'
import { Transaction } from 'sequelize'

@Table({
    timestamps: true,
    paranoid: true,
})
@Index({ name: 'entry-index', unique: true })
export default class Entry extends Model {
    @AllowNull(false)
    @Column
    order: number

    @AllowNull(false)
    @Column
    isStarred: boolean

    @AllowNull(false)
    @Column
    isOwned: boolean

    @AllowNull(false)
    @Column
    isPlaying: boolean

    @Index('entry-index')
    @ForeignKey(() => User)
    userId: number

    @BelongsTo(() => User)
    user: User

    @Index('entry-index')
    @ForeignKey(() => Game)
    gameId: number

    @BelongsTo(() => Game)
    game: Game

    @BeforeDestroy
    // Likely not playing anymore if it was removed.
    // Simplifies resetting order on restoration.
    static async unsetPlaying(instance: Entry, options: any) {
        try {
            await instance.update(
                { isPlaying: false },
                { transaction: options.transaction }
            )
        } catch (error) {
            throw error
        }
    }
    @BeforeDestroy
    // Fix potential gap in entry order by moving deleted to end.
    static async fillOrderGap(instance: Entry, options: any) {
        const startIndex = instance.order

        const count = await Entry.count({ where: { userId: instance.userId } })

        try {
            await Entry.moveOne(
                instance.userId,
                startIndex,
                count - 1,
                options.transaction
            )
        } catch (error) {
            throw error
        }
    }

    @AfterRestore
    // Move restored instance to end of order
    static async resetRestoredInstanceOrder(instance: Entry, options: any) {
        const entryCount = await Entry.count({
            where: {
                userId: instance.userId,
            },
        })

        try {
            await instance.update(
                { order: entryCount },
                { transaction: options.transaction }
            )
        } catch (error) {
            throw error
        }
    }

    // When changing isPlaying, call this to keep them grouped at the
    // beginning of the order or to properly ungroup an entry.
    static async moveBetweenPlaying(
        userId: number,
        entry: Entry,
        newIsPlayingValue: boolean,
        transaction: Transaction
    ) {
        let playingCount = await Entry.count({
            where: {
                userId: userId,
                isPlaying: true,
            },
        })

        // If we're setting isPlaying to false, we need to account for
        // for playingCount including the entry we're moving.
        if (newIsPlayingValue === false) playingCount -= 1

        await Entry.moveOne(userId, entry.order, playingCount, transaction)
    }

    // Change the position of one entry in the order.
    static async moveOne(
        userId: number,
        startIndex: number,
        endIndex: number,
        transaction: Transaction
    ) {
        if (startIndex === endIndex) {
            return []
        }

        const entries = await Entry.findAll({
            where: { userId: userId },
            order: [['order', 'ASC']],
        })

        const moved = entries.splice(startIndex, 1)
        entries.splice(endIndex, 0, moved[0])

        try {
            return await Entry.reorder(
                entries,
                startIndex,
                endIndex,
                transaction
            )
        } catch (error) {
            throw error
        }
    }

    // Given a pair of indexes, iterate over a range between the two,
    // setting order to each entries' index.
    static async reorder(
        entries: Entry[],
        startIndex: number,
        endIndex: number,
        transaction: Transaction
    ) {
        if (startIndex < 0 || endIndex < 0) {
            throw new Error(
                "Can't pass negative index values to reorder function."
            )
        }

        const lowerIndex = startIndex < endIndex ? startIndex : endIndex
        const higherIndex = startIndex < endIndex ? endIndex : startIndex
        let changed = []
        for (let i = lowerIndex; i <= higherIndex; i++) {
            entries[i].set({ order: i })
            changed.push(entries[i])
        }

        const t = transaction
        try {
            const saveAll = changed.map((entry) => {
                return entry.save({ transaction: t })
            })

            await Promise.all(saveAll)
            return changed
        } catch (error) {
            throw error
        }
    }
}
