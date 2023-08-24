const config = {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 5000,
    jwtOptions: {
        issuer: process.env.VITE_API_URL,
        audience: process.env.CLIENT_URL || 'localhost',
    },
    refreshInterval: Number(process.env.CACHED_REFRESH_INTERVAL_DAYS) || 14,
}

export default config
