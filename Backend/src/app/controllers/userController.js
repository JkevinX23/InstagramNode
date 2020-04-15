import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel';
import PublicModel from '../models/publicModel';
import FirebaseAcess from '../../config/firebase';

class UserController {
  async store(req, res) {
    const {
      name, email, username, password, nascimento, bio,
    } = req.body;
    const user = new UserModel({
      name,
      email,
      username,
      password,
      nascimento,
      bio,
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
      await User.updateOne({ password: senhaHash }).exec();
      return res.json({ message: 'Senha alterada com sucesso' });
    }

    if (username && !(await UserModel.findOne({ username }).exec())) {
      await User.updateOne({ username }).exec();
      return res.json({ message: 'Alteração do username realizada com sucesso' });
    }

    return res.json({ message: 'Este username já existe' });
  }

  async profile(req, res) {
    const Publicacoes = await PublicModel.find({ id_user: req.userId }).exec();
    if (Publicacoes) return res.json({ Publicacoes });
    return res.json({ message: 'Nenhuma publicação' });
  }

  async userInfo(req, res) {
    return res.json(await UserModel.findById({ _id: req.userId }));
  }

  async set_photo(req, res) {
    const id_user = req.userId;
    FirebaseAcess.uploadFile(req.file.path);
    const path = req.file.filename;

    const user = await UserModel.findById(id_user);

    if (user) {
      return res.json(await user.updateOne({ profilePhoto: path }));
    }
    return res.status(401).json({ error: 'User not found' });
  }

  async getPhoto(req, res) {
    const user = await UserModel.findById(req.userId).exec();
    const fileUrl = await FirebaseAcess.getFile(user.profilePhoto);
    res.json({ fileUrl });
  }
}

export default new UserController();
