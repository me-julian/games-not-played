'use strict'

import { Sequelize } from 'sequelize'
import config from '../config'

const env = config.server.env

const sequelize = new Sequelize(
    config.database[env].database,
    config.database[env].username,
    config.database[env].password,
    {
        host: config.database[env].host,
        port: config.database[env].port,
        dialect: config.database[env].dialect,
        define: {
            underscored: true,
        },
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

// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}

export default db
