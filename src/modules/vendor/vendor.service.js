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
  logger.info({
    vendorId: data.vendorId,
    status: data.status,
    adminId: data.adminId,
  });
  const vendor = await vendorRepository.findVendorById(data.vendorId);

  if (!vendor) {
    logger.warn(
      {
        vendorId: data.vendorId,
      },
      "Vendor does not found",
    );

    throw new Error("Vendor did not found");
  }

  const updatedVendorStatus = await vendorRepository.updateVendorStatus(
    data.vendorId,
    data.status,
  );

  logger.info(
    {
      vendorId: data.vendorId,
      status: data.status,
      adminId: data.adminId,
    },
    "Vendor status updated successfully",
  );

  return updatedVendorStatus;
}

module.exports = {
  createVendor,
  updateVendorStatus,
};
