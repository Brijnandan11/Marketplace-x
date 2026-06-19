const app = require("./app")

const logger = require("./config/logger")
const env = require("./config/env")

const { connectDB } = require("./config/db")

async function startServer() {
    try {
        await connectDB()

        app.listen(env.PORT,()=>{
            logger.info(
                `Marketplacex Server is running on Port ${env.PORT}`
            )
        })
    } catch (error) {
        logger.fatal(
            error,"Failed to start server"
        )

        process.exit(1)
    }
}

startServer()