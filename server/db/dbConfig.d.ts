type dbConfig = {
    [index: string]: {
        username: string
        password: string
        database: string
        host: string
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

declare module 'dbConfig' {
    export default dbConfig as dbConfig
}
