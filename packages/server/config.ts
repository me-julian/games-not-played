const config = {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.API_PORT),
    jwtSecret: process.env.JWT_SECRET,
    jwtOptions: {
        issuer: process.env.API_URL || `127.0.0.1:${process.env.API_PORT}`,
        audience: process.env.CLIENT_URL || '127.0.0.1',
    },
    refreshInterval: Number(process.env.CACHED_REFRESH_INTERVAL_DAYS) || 14,
}

export default config
