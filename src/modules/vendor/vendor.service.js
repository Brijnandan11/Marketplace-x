const logger = require("../../config/logger");

const vendorRepository = require("./vendor.repository");

async function createVendor(data) {
  logger.info({
    userId: data.userId,
    slug: data.slug,
  });
  const existingVendor = await vendorRepository.findVendorBySlug(data.slug);

  if (existingVendor) {
    logger.warn(
      {
        slug: data.slug,
      },
      "Vendor slug already exist",
    );

    throw new Error("Vendor slug already exist");
  }

  const vendor = await vendorRepository.createVendor(data);

  logger.info({
    vendorId: vendor.id,
    userId: data.userId,
  });

  return vendor;
}

async function updateVendorStatus(data) {
  logger.info(
    {
      vendorId: data.vendorId,
      status: data.status,
      adminId: data.adminId,
    },
    "Vendor status update started",
  );

  const vendor = await vendorRepository.findVendorById(data.vendorId);

  if (!vendor) {
    logger.warn(
      {
        vendorId: data.vendorId,
      },
      "Vendor not found",
    );

    throw new Error("Vendor not found");
  }

  const validTransitions = {
    PENDING: ["APPROVED", "REJECTED"],
    APPROVED: ["SUSPENDED"],
    SUSPENDED: ["APPROVED"],
    REJECTED: [],
  };

  const allowedTransitions = validTransitions[vendor.status];

  if (!allowedTransitions.includes(data.status)) {
    logger.warn(
      {
        vendorId: vendor.id,
        currentStatus: vendor.status,
        requestedStatus: data.status,
      },
      "Invalid vendor status transition",
    );

    throw new Error(
      `Cannot change vendor status from ${vendor.status} to ${data.status}`,
    );
  }

  const updatedVendor = await vendorRepository.updateVendorStatus(
    data.vendorId,
    data.status,
  );

  logger.info(
    {
      vendorId: updatedVendor.id,
      status: updatedVendor.status,
      adminId: data.adminId,
    },
    "Vendor status updated successfully",
  );

  return updatedVendor;
}

module.exports = {
  createVendor,
  updateVendorStatus,
};
