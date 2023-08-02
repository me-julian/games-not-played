'use strict'
import { Table, Column, Model, Unique } from 'sequelize-typescript'

@Table
export default class User extends Model {
    @Unique
    @Column
    username: string

    @Column
    hashedPassword: Buffer

    @Column
    salt: Buffer
}
