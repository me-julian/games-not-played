'use strict'
import {
    Table,
    Column,
    Model,
    ForeignKey,
    AllowNull,
    Index,
    BelongsTo,
} from 'sequelize-typescript'
import User from './User'
import Game from './Game'

@Table({
    timestamps: true,
    paranoid: true,
})
@Index({ name: 'entry-index', unique: true })
export default class Entry extends Model {
    @AllowNull(false)
    @Column
    customOrder: number

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
}
