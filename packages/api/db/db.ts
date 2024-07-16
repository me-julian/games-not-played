'use strict'
import { Sequelize } from 'sequelize-typescript'

import config from './dbConfig'

export const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
    }
)

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const MAX_RETRIES = 10
let retries = 0

function connectWithRetry(): Promise<void> {
    return sequelize
        .authenticate()
        .then(() => {
            console.log('Database connection successful.')
        })
        .catch(() => {
            retries++
            if (retries <= MAX_RETRIES) {
                console.error(
                    `Error connecting to database. Retrying in 3 seconds. Attempt ${retries}/${MAX_RETRIES}`
                )
                return wait(3000).then(connectWithRetry)
            } else {
                throw new Error(
                    `Failed to connect to database after ${MAX_RETRIES} attempts.`
                )
            }
        })
}

connectWithRetry()

sequelize.addModels([__dirname + '/models'])

import User from './models/User'
import Game from './models/Game'
import Entry from './models/Entry'

// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    users: User,
    games: Game,
    entries: Entry,
}

export default db
