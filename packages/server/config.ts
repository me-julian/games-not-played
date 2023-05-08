type serverConfig = {
    name: string
    env: string
    port: number
}

const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '') || 5000,
}

export default config
