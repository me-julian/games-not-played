'use strict'
import { Sequelize } from 'sequelize-typescript'
// import 'dotenv/config'

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

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection successful.')
    })
    .catch(() => {
        console.error('Error connecting to database.')
    })

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
