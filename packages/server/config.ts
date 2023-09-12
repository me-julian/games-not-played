const config = {
    port: Number(process.env.API_PORT),
    rawgUrl: process.env.RAWG_URL,
    rawgApiToken: process.env.RAWG_API_TOKEN,
    jwtSecret: process.env.JWT_SECRET,
    jwtOptions: {
        issuer: process.env.API_URL,
        audience: process.env.CLIENT_URL,
    },
    refreshInterval: Number(process.env.CACHED_REFRESH_INTERVAL_DAYS) || 14,
}

export default config
