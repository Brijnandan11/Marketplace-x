const authService = require("./auth.service");

const logger = require("../../config/logger");

const { registerSchema } = require("./auth.validation");

async function register(req, res) {
  try {
    const validatedData = registerSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        errors: validatedData.error.issues,
      });
    }

    const user = await authService.registerUser(validatedData.data);

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
