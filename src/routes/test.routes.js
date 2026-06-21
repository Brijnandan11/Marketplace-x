const userRepository = require("../repositories/user.repository")

app.get("/users-test",async(req,res)=>{
    const users = await userRepository.getAllUsers();

    return res.json(users);
})