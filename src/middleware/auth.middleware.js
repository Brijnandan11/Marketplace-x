const jwt = require("jsonwebtoken");

const env = require("../config/env");

const logger = require("../config/logger");

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      logger.warn("Authorization header is missing");
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      logger.warn("Token is missing");
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }

    const decoded = jwt.verify(token, env.jwtSecret);

    req.user = decoded;

    logger.info(
      {
        userId: decoded.id,
        role: decoded.role,
      },
      "User authenticated successfully",
    );

    next();
  } catch (error) {
    logger.error(
      {
        error: error.message,
      },
      "Authentication failed",
    );

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}

module.exports = authenticate;
