type serverConfig = {
    name: string
    env: string
    port: number
}

// import dbConfig from 'dbConfig'

const config = {
    server: {
        name: 'API',
        env: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT || '') || 5000,
    } as serverConfig,
    // database: dbConfig,
}

export default config
