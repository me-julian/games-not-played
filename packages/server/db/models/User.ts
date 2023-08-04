'use strict'
import { Table, Column, Model, Unique, HasMany } from 'sequelize-typescript'
import BacklogEntry from './BacklogEntry'

@Table({
    timestamps: true,
})
export default class User extends Model {
    @Unique
    @Column
    username: string

    @Column
    hashedPassword: Buffer

    @Column
    salt: Buffer

    @HasMany(() => BacklogEntry)
    BacklogEntries: BacklogEntry[]
}
