import CommentModel from '../models/commentModel';
import NotificationModel from '../models/notificationModel';
import PulicModel from '../models/publicModel';

class Comment {
  async store(req, res) {
    const { id_publicacao, content } = req.body;
    const currentUser = req.userId;
    const { username } = req;
    const comment = new CommentModel(
      {
        id_user: currentUser,
        id_publicacao,
        content,
      },
    );

    comment.save();

    const { id_user } = PulicModel.findById({ _id: id_publicacao });

    const notificacao = new NotificationModel(
      {
        id_user,
        type: 'Comment',
        content: `${username} comentou sua publicação.`,
      },
    );

    notificacao.save();

    return res.json('Comentário realizado com sucesso. ');
  }

  async index(req, res) {
    const { _id } = req.body;
    const comments = await CommentModel.find({ public_id: _id });
    return res.json(comments);
  }
}

export default new Comment();
