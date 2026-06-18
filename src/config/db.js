const { Pool } = require("pg")
const env = require("./env")
const logger = require("./logger")

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD
})

async function connectDB() {
    try {
        await pool.query(`SELECT 1`)

        logger.info("Connected to DB")
    } catch (error) {
        logger.error(error,"Database connection failed")

        process.exit(1);
    }
}

module.exports = { pool,connectDB }