const express = require("express");

const router = express.Router();

const vendorController = require("./vendor.controller");

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/auth.middleware");

router.post("/", authenticate, vendorController.createVendor);

router.post(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  vendorController.updateVendorStatus,
);

module.exports = router;
