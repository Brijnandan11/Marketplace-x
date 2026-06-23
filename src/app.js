const express = require("express");

const httpLogger = require("./middleware/httpLogger");

const authRoutes = require("./modules/auth/auth.routes");

const app = express();

app.use(httpLogger);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

//just for pull
app.get("/", (req, res) => {
  res.status(200).json({
    message: "MarketplaceX API",
  });
});

module.exports = app;
