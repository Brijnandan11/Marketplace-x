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
      `INSERT INTO vendor_users (vendor_id, user_id, role) VALUES ($1, $2, $3) `,
      [vendor.id, data.userId, "OWNER"],
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

async function findVendorById(id) {
  const result = await pool.query(`SELECT * FROM vendors WHERE id = $1`, [id]);
  return result.rows[0];
}

async function updateVendorStatus(id, status) {
  const result = await pool.query(
    ` UPDATE vendors SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING * `,
    [status, id],
  );
  return result.rows[0];
}

module.exports = {
  findVendorBySlug,
  createVendor,
  findVendorById,
  updateVendorStatus,
};
