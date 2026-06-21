const pool = require("../db");

async function getAllUsers() {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
}

module.exports = {
  getAllUsers,
};
