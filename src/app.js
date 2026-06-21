const express = require("express");

const pool = require("./db/index");

const httpLogger = require("./middleware/httpLogger");

const app = express();

app.use(httpLogger);

app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API running",
  });
});

app.get("/db-test", async (req, res) => {
  const result = await pool.query("SELECT NOW()");

  return res.json(result.rows[0]);
});

module.exports = app;
