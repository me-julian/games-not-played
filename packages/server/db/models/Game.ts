'use strict'
import {
    Table,
    Column,
    Model,
    Unique,
    PrimaryKey,
    HasMany,
} from 'sequelize-typescript'
import BacklogEntry from './BacklogEntry'

@Table({
    timestamps: true,
})
export default class Game extends Model {
    @PrimaryKey
    @Unique
    @Column
    id: number

    @Column
    name: string

    @Column
    playtime: number

    @Column
    backgroundImage: string

    @HasMany(() => BacklogEntry)
    BacklogEntries: BacklogEntry[]
}
