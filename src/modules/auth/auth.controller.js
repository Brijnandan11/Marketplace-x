const authService = require("./auth.service");

const logger = require("../../config/logger");

async function register(req, res) {
  try {
    const user = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User resgistered successfully",
      data: user,
    });
  } catch (error) {
    logger.error(
      {
        error: error.message,
      },
      "Registration failed",
    );

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  register,
};
