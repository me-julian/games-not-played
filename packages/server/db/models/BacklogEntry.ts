'use strict'
import {
    Table,
    Column,
    Model,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript'
import User from './User'
import Game from './Game'

@Table({
    timestamps: true,
    paranoid: true,
})
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

    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Game)
    @Column
    gameId: number
}
