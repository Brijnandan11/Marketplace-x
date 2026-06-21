const userRepository = require("../repositories/user.repository");
const app = require("../app");

app.get("/users-test", async (req, res) => {
  const users = await userRepository.getAllUsers();

  return res.json(users);
});
