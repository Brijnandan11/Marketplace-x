const express = require("express");

const router = express.Router();

const vendorController = require("./vendor.controller");

const authenticate = require("../../middleware/auth.middleware");

router.post("/", authenticate, vendorController.createVendor);

module.exports = router;
