'use strict'
import { Table, Column, Model, Unique } from 'sequelize-typescript'

@Table
class User extends Model {
    @Column
    @Unique
    username: string

    @Column
    hashed_password: Buffer

    @Column
    salt: Buffer
}

export default User
