import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import secret from '../../keys';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token not provider' });

  const [, token] = authHeader.split(' ');

  try {
    const valid = await promisify(jwt.verify)(token, secret.secret());
    req.iduser = valid._id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
