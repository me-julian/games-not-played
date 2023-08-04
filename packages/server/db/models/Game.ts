'use strict'
import {
    Table,
    Column,
    Model,
    Unique,
    PrimaryKey,
    HasMany,
} from 'sequelize-typescript'
import Entry from './Entry'

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

    @HasMany(() => Entry)
    Entries: Entry[]
}
