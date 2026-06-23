const bcrypt = require("bcryptjs");

const authRepository = require("./auth.repository");

const logger = require("../../config/logger");

const jwt = require("jsonwebtoken");

const env = require("../../config/env");

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

async function loginUser(data) {
  logger.info(
    {
      email: data.email,
    },
    "Login attempt",
  );
  logger.info(
    {
      email: data.email,
    },
    "EMAIL RECEIVED FOR LOGIN",
  );
  const user = await authRepository.findUserByEmail(data.email);

  if (!user) {
    logger.warn(
      {
        email: data.email,
      },
      "User not found :- email does not exist",
    );

    throw new Error("Invalid email address or password");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    logger.warn(
      {
        email: data.email,
      },
      "Invalid password",
    );

    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    },
  );

  logger.info(
    {
      userId: user.id,
    },
    "User logged in successfully",
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};
