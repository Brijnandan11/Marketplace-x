const pool = require("../../db");

async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
}

async function createUser(user) {
  const result = await pool.query(
    `INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user.name, user.email, user.password, user.role],
  );
  return result.rows[0];
}

module.exports = {
  findUserByEmail,
  createUser,
};
