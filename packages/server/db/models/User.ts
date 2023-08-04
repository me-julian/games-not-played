'use strict'
import { Table, Column, Model, Unique, HasMany } from 'sequelize-typescript'
import Entry from './Entry'

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

    @HasMany(() => Entry)
    Entries: Entry[]
}
