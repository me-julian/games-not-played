import express, { Express } from 'express'
import logger from 'morgan'
// import 'dotenv/config'

const app: Express = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (!process.env.JWT_SECRET || !process.env.RAWG_API_TOKEN) {
    throw new Error(
        'The environment variables for secrets are not properly set!'
    )
}

// Auth & CORS setup
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
    res.append('Access-Control-Allow-Headers', [
        'Content',
        'Content-Type',
        'Authorization',
    ])
    next()
})

// Routing & server initialization
import authRouter from './routes/auth'
import apiRouter from './routes/api'

app.use(authRouter)
app.use(apiRouter)

import config from './config'

app.listen(config.port, () => {
    console.log(
        `[server]: Server is running at http://localhost:${config.port}`
    )
})

process.on('SIGINT', function () {
    console.log('Shut down from SIGINT (Ctrl-C)')
    process.exit(0)
})

export default app
