import { Express } from 'express'
import passport from 'passport'

import session from 'express-session'
declare module 'express-session' {
    export interface SessionData {
        messages: Array<string>
        passport: {
            user: {
                id: string
                username: string
            }
        }
    }
}

import SequelizeSession from 'connect-session-sequelize'
import db from './db/db'

export function sessionMiddleware(app: Express) {
    const SequelizeStore = SequelizeSession(session.Store)
    const sessionStore = new SequelizeStore({ db: db.sequelize })

    app.use(
        session({
            secret: 'keyboard cat',
            resave: false, // don't save session if unmodified
            saveUninitialized: false, // don't create session until something stored
            store: sessionStore,
        })
    )
    // Create sessions table if it doesn't already exist.
    sessionStore.sync()

    app.use(passport.authenticate('session'))
}
