import userModel from "../models/userModel";

class UserController {
  async store(req, res) {
    const { name, email, username, senha, nascimento } = req.body;
    const user = new userModel({
      name,
      email,
      username,
      senha,
      nascimento,
    });

    return res.json(await user.save());
  }
}

export default new UserController();
