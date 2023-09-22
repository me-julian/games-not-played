const config = {
    rawgUrl: process.env.RAWG_URL,
    rawgApiToken: process.env.RAWG_API_TOKEN,
    jwtSecret: process.env.JWT_SECRET,
    appDomain: process.env.APP_DOMAIN,
    jwtOptions: {
        issuer: process.env.APP_DOMAIN,
        audience: process.env.APP_DOMAIN,
    },
    refreshInterval: Number(process.env.CACHED_REFRESH_INTERVAL_DAYS) || 14,
}

export default config
