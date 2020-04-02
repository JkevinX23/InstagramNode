import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel';

class UserController {
  async create(req, res) {
    const {
      name, email, username, senha, nascimento, bio
    } = req.body;
    const user = new UserModel({
      name,
      email,
      username,
      senha,
      nascimento,
      bio
    });

    const auth = await UserModel.findOne({ email }).exec();
    if (auth) return res.status(400).json({ error: 'User already exists.' });
    const nick = await UserModel.findOne({ username }).exec();
    if (nick) return res.status(400).json({ error: 'Username already exists.' });
    return res.json(await user.save());
  }

  async update(req, res) {
    const { username, password, oldPassword } = req.body;
    const User = await UserModel.findById(req.userId).exec();
    const validacao = await bcrypt.compare(oldPassword, User.senha);
    if (!validacao) {
      return res.status(401).json({ error: 'Password not match' });
    }
    if (password) {
      const senhaHash = await bcrypt.hash(password, 8);
      await User.updateOne({ senha: senhaHash }).exec();
      return res.json({ message: 'Senha alterada com sucesso' });
    }

    if (username && !(await UserModel.findOne({ username }).exec())) {
      await User.updateOne({ username }).exec();
      return res.json({ message: 'Alteração do username realizada com sucesso' });
    }

    return res.json({ message: 'Este username já existe' });
  }
}
export default new UserController();
