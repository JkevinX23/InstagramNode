import LikeModel from '../models/likeModel';
import NotifModel from '../models/notificationModel';

class Like {
  async store(req, res) {
    const like = new LikeModel(
      {
        user_id: req.userId,
        public_id: req.header('publicId'),
      },
    );

    try {
      like.save();

      const { id_user, _id } = req.body;

      const notificacao = new NotifModel(
        {
          id_user,
          type: 'Like',
          content: `${req.username} curtiu sua publicacao`,
          id_public: _id,
        },
      );

      notificacao.save();
    } catch (err) {
      return res.status(401).json({ error: 'Like control store error' });
    }
    return res.json({ status: 'ok' });
  }

  async index(req, res) {
    const { _id } = req.body;
    return res.json(await LikeModel.find({ public_id: _id }));
  }
}

export default new Like();
