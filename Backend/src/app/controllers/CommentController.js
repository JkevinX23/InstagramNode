import CommentModel from '../models/commentModel';
import NotificationModel from '../models/notificationModel';
import PulicModel from '../models/publicModel';
import userModel from '../models/userModel';

class Comment {
  async store(req, res) {
    const { idpublic, content } = req.body;
    const currentUser = req.iduser;
    const comment = new CommentModel(
      {
        iduser: currentUser,
        idpublic,
        content,
      },
    );

    const { iduser } = await PulicModel.findById({ _id: idpublic });
    const { username } = await userModel.findById({ _id: iduser });

    const notificacao = new NotificationModel(
      {
        iduser,
        type: 'Comment',
        content: `@${username} comentou sua publicação.`,
      },
    );

    notificacao.save();

    return res.json(await comment.save());
  }

  async index(req, res) {
    const { id } = req.params;
    const comments = await CommentModel.find({ idpublic: id });
    comments.sort((a, b) => b.created_at - a.created_at);
    return res.json(comments);
  }
}

export default new Comment();
