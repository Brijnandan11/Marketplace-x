const logger = require("../config/logger")

function errorMiddleware(err,req,res,next){
    logger.error({
        error: err.message,
        stack: err.stack
    },"Unexpected Error")

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}

module.exports = errorMiddleware