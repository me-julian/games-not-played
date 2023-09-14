import express, { Express } from 'express'
import logger from 'morgan'
// import 'dotenv/config'
import config from './config'

const app: Express = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// CORS setup
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', config.clientDomain)
    res.append(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,PATCH,OPTIONS,DELETE'
    )
    res.append('Access-Control-Allow-Headers', [
        'Content',
        'Content-Type',
        'Authorization',
    ])

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }

    next()
})

// Routing & server initialization
import authRouter from './routes/auth'
import apiRouter from './routes/api'

app.use(authRouter)
app.use(apiRouter)

app.listen(config.port, () => {
    console.log(
        `[server]: Server is running at http://127.0.0.1:${config.port}`
    )
})

process.on('SIGINT', function () {
    console.log('Shut down from SIGINT (Ctrl-C)')
    process.exit(0)
})

export default app
