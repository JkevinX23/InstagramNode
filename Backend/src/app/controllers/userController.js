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
    const { username, password, oldpassword } = req.body;
    const User = await UserModel.findById(req.iduser).exec();
    const validacao = await bcrypt.compare(oldpassword, User.senha);
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
    const Publicacoes = await PublicModel.find({ iduser: req.iduser }).exec();
    if (Publicacoes) return res.json({ Publicacoes });
    return res.json({ message: 'Nenhuma publicação' });
  }

  async userInfo(req, res) {
    return res.json(await UserModel.findById({ _id: req.iduser }));
  }

  async getUserFromID(req, res) {
    return res.json(await UserModel.findById({ _id: req.body.iduser }));
  }

  async set_photo(req, res) {
    const { iduser } = req;
    FirebaseAcess.uploadFile(req.file.path);
    const path = req.file.filename;

    const user = await UserModel.findById(iduser);

    if (user) {
      return res.json(await user.updateOne({ profilephoto: path }));
    }
    return res.status(401).json({ error: 'User not found' });
  }

  async getPhoto(req, res) {
    const user = await UserModel.findById(req.iduser).exec();
    const fileUrl = await FirebaseAcess.getFile(user.profilephoto);
    return res.json({ fileUrl });
  }

  async getProfilePhoto(req, res) {
    const { _id } = req.body;
    const user = await UserModel.findById(_id).exec();
    if (user) {
      const fileUrl = await FirebaseAcess.getFile(user.profilephoto);
      return res.json({ fileUrl });
    }
    return res.status(401).json({ error: 'User not found' });
  }

  async index(req, res) {
    const users = await UserModel.find({ flowabble: true }, {
      _id: 1,
      flowabble: 1,
      name: 1,
      username: 1,
      bio: 1,
      profilephoto: 1,
    });
    return res.json(users);
  }
}

export default new UserController();
