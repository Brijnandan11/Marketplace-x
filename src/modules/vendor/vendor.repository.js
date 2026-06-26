const pool = require("../../db/index");

async function findVendorBySlug(slug) {
  const result = await pool.query(`SELECT * FROM vendors WHERE slug = $1`, [
    slug,
  ]);
  return result.rows[0];
}

module.exports = {
  findVendorBySlug,
};
