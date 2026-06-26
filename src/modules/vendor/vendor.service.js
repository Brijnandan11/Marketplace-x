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

module.exports = createVendor;
