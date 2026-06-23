const bcrypt = require("bcryptjs");

const authRepository = require("./auth.repository");

const logger = require("../../config/logger");

async function registerUser(data) {
  logger.info(
    {
      email: data.email,
    },
    "User registration start",
  );

  const existingUser = await authRepository.findUserByEmail(data.email);

  if (existingUser) {
    logger.warn(
      {
        email: data.email,
      },
      "Registration failed: email already exist",
    );

    throw new Error("Email already exist");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await authRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "CUSTOMER",
  });

  logger.info(
    {
      userId: user.id,
      email: user.email,
    },
    "User registered successfully",
  );

  return user;
}

module.exports = {
  registerUser,
};
