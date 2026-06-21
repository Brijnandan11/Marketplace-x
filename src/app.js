const express = require("express")

const httpLogger = require("./middleware/httpLogger")

const app = express()

app.use(httpLogger)

app.use(express.json())

app.get("/health",(req,res)=>{
    return res.status(200).json({
        success: true,
        message: "API running"
    })
})

module.exports = app;