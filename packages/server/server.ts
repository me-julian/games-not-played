import express, { Express } from 'express'
import ViteExpress from 'vite-express'
import path from 'path'
import logger from 'morgan'

const app: Express = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

import { sessionMiddleware } from './sessions'
sessionMiddleware(app)

import { csrf } from './csrf'
app.use(csrf.csrfSynchronisedProtection)

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/csrf-token', (req, res) => {
    res.json({ token: csrf.generateToken(req) })
})

import authRouter from './routes/auth'
import apiRouter from './routes/api'

app.use(authRouter)
app.use('/api', apiRouter)

import config from './config'

ViteExpress.config({
    mode: config.env === 'production' ? 'production' : 'development',
})

ViteExpress.listen(app, config.port, () => {
    console.log(
        `⚡️[server]: Server is running at http://localhost:${config.port}`
    )
})

export default app
