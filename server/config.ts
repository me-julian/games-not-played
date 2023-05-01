type config = {
    name: string
    env: string
    port: number
    db: {
        name: string
        host: string
        username: string
        password: string
        port: number
        dialect:
            | 'mysql'
            | 'postgres'
            | 'sqlite'
            | 'mariadb'
            | 'mssql'
            | 'db2'
            | 'snowflake'
            | 'oracle'
    }
}
const config: config = {
    name: 'API',
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '') || 5000,
    db: {
        name: process.env.DATABASE_NAME || 'test-db',
        host: process.env.DATABASE_HOST || 'localhost',
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || 'password',
        port: parseInt(process.env.DATABASE_PORT || '') || 3306,
        dialect: 'mysql',
    },
}

export default config
