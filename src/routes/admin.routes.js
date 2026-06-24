const express = require("express");

const authenticate = require("../middleware/auth.middleware");

const authorize = require("../middleware/authorize.middleware");

const router = express.Router();

router.get("/dashboard", authenticate, authorize("ADMIN"), (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome ADMIN",
  });
});

module.exports = router;
