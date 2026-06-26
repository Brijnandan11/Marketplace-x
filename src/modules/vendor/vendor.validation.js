const { z } = require("zod");

const createVendorSchema = z.object({
  name: z.string().min(3, "Vendor name must be atleast 3 character"),
  slug: z
    .string()
    .min(3)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens",
    ),
  description: z.string().max(300).optional(),
});

module.exports = {
  createVendorSchema,
};
