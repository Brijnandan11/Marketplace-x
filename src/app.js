const express = require("express")

const requestLogger = require("./middlewares/requestLogger.middleware")

const healthRoutes = require("./routes/health.routes")

const errorMiddleware = require("./middlewares/error.middleware")

const app = express()

app.use(requestLogger)

app.use(express.json())

app.use("/api/v1/health",healthRoutes)

app.use(errorMiddleware)

module.exports = app