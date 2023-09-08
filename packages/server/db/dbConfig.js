module.exports = {
    development: {
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || 'password',
        database: process.env.DATABASE_NAME || 'database_development',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '') || 3306,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_MIGRATIONS_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '') || 3306,
        dialect: 'mysql',
    },
}
