'use strict'
import {
    Table,
    Column,
    Model,
    ForeignKey,
    AllowNull,
    Index,
} from 'sequelize-typescript'
import User from './User'
import Game from './Game'

@Table({
    timestamps: true,
    paranoid: true,
})
@Index({ name: 'entry-index', unique: true })
export default class BacklogEntry extends Model {
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
    @Column
    userId: number

    @Index('entry-index')
    @ForeignKey(() => Game)
    @Column
    gameId: number
}
