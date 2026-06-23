const pinoHttp = require("pino-http");
const logger = require("../config/logger");

module.exports = pinoHttp({
  logger,
  // just for pull
  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} completed with ${res.statusCode}`;
  },
});
