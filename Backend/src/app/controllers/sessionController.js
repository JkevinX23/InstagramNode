import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import keys from '../../keys';

class SessionnController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }
    if (!(await bcrypt.compare(password, user.senha))) {
      return res.status(401).json({ error: 'Password not match' });
    }
    const {
      _id, name, username, nascimento,
    } = user;

    return res.json({
      user: {
        _id,
        name,
        username,
        email,
        nascimento,
      },
      token: jwt.sign({ _id }, keys.secret(), {
        expiresIn: keys.tokenExpireIn(),
      }),
    });
  }
}


export default new SessionnController();
