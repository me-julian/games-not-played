'use strict'

import { Sequelize } from 'sequelize'
import config from './config'

const sequelize = new Sequelize(
    config.db.name,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect,
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
