const config = {
    port: Number(process.env.API_PORT),
    rawgUrl: process.env.RAWG_URL,
    rawgApiToken: process.env.RAWG_API_TOKEN,
    jwtSecret: process.env.JWT_SECRET,
    clientDomain: process.env.CLIENT_DOMAIN,
    jwtOptions: {
        issuer: process.env.API_DOMAIN,
        audience: process.env.CLIENT_DOMAIN,
    },
    refreshInterval: Number(process.env.CACHED_REFRESH_INTERVAL_DAYS) || 14,
}

export default config
