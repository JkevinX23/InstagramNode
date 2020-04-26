import LikeModel from '../models/likeModel';
import NotifModel from '../models/notificationModel';
import PulicModel from '../models/publicModel';
import userModel from '../models/userModel';

class Like {
  async store(req, res) {
    const { id } = req.params;
    const like = new LikeModel(
      {
        iduser: req.iduser,
        idpublic: id,
      },
    );

    try {
      const { iduser } = await PulicModel.findById({ _id: id });
      const { username } = await userModel.findById({ _id: iduser });

      const notificacao = new NotifModel(
        {
          iduser,
          type: 'Like',
          content: `@${username} curtiu sua publicacao`,
          idpublic: id,
        },
      );

      notificacao.save();
    } catch (err) {
      return res.status(401).json({ error: 'Like control store error' });
    }
    return res.json(await like.save());
  }

  async index(req, res) {
    const { _id } = req.body;
    return res.json(await LikeModel.find({ idpublic: _id }));
  }
}

export default new Like();
