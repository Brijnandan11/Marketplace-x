const logger = require("../../config/logger");

const vendorService = require("./vendor.service");

const { createVendorSchema } = require("./vendor.validation");

async function createVendor(req, res) {
  try {
    const validatedData = createVendorSchema.parse(req.body);

    const vendor = await vendorService.createVendor({
      ...validatedData,
      userId: req.user.userId,
    });

    logger.info(
      {
        vendorId: vendor.id,
        userId: req.user.userId,
      },
      "Vendor created successfully",
    );

    return res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      data: vendor,
    });
  } catch (error) {
    logger.error(
      {
        error: error.message,
      },
      "Vendor creation failed",
    );

    return res.status(400).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
}

module.exports = {
  createVendor,
};
