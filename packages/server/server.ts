import express, { Express } from 'express'
import ViteExpress from 'vite-express'
import path from 'path'
import logger from 'morgan'

const app: Express = express()

var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

import useSessionMiddleware from './sessions'
useSessionMiddleware(app)

app.use(authRouter)
app.use(indexRouter)

import config from './config'

ViteExpress.config({
    mode: config.env === 'production' ? 'production' : 'development',
})

ViteExpress.listen(app, config.port, () => {
    console.log(
        `⚡️[server]: Server is running at http://localhost:${config.port}`
    )
})

module.exports = app
