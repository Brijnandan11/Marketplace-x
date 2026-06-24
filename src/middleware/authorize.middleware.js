const logger = require("../config/logger");

function authorize(...roles) {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!roles.includes(userRole)) {
        logger.warn(
          {
            userId: req.user.userId,
            role: userRole,
          },
          "Authentication failed",
        );

        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      logger.info(
        {
          userId: req.user.userId,
          role: userRole,
        },
        "Authorization successfull",
      );

      next();
    } catch (error) {
      logger.error(
        {
          error: error.message,
        },
        "Authorization error",
      );

      return res.status(500).json({
        success: false,
        message: "Authorization failed",
      });
    }
  };
}

module.exports = authorize;
