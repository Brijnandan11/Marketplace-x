const express = require("express");

const authentication = require("../middleware/auth.middleware");

const authorization = require("../middleware/authorize.middleware");

const router = express.Router();

router.get("/dashboard", authentication, authorization("ADMIN"), (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome ADMIN",
  });
});

module.exports = router;
