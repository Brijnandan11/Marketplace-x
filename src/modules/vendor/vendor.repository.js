const pool = require("../../db/index");

async function findVendorBySlug(slug) {
  const result = await pool.query(`SELECT * FROM vendors WHERE slug = $1`, [
    slug,
  ]);
  return result.rows[0];
}

async function createVendor(data) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const vendorResult = await client.query(
      `INSERT INTO vendors (name, slug, description) VALUES ($1, $2, $3) RETURNING * `,
      [data.name, data.slug, data.description],
    );
    const vendor = vendorResult.rows[0];

    await client.query(
      `INSERT INTO vendor_users (vendor_id, user_id) VALUES ($1, $2) `,
      [vendor.id, data.userId],
    );

    await client.query("COMMIT");

    return vendor;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  findVendorBySlug,
  createVendor,
};
