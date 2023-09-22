import express, { Express } from 'express'
import logger from 'morgan'
import config from './config'

const app: Express = express()

// Make sure secrets are retrieved.
if (!config.jwtSecret || !config.rawgApiToken) {
    throw new Error(
        'The environment variables for secrets are not properly set!'
    )
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const clientOrigin =
    process.env.NODE_ENV === 'production' ? `https://${config.appDomain}` : '*'

// CORS setup
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', clientOrigin)
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
import router from './routes'
app.use('/api', router)

app.listen(5000, () => {
    console.log(`[server]: Server is running at http://127.0.0.1:5000`)
})

process.on('SIGINT', function () {
    console.log('Shut down from SIGINT (Ctrl-C)')
    process.exit(0)
})

export default app
