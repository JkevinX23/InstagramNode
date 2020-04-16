import FlowModel from '../models/flows';
import UserModel from '../models/userModel';
import Notification from '../models/notificationModel';

class Flow {
  async store(req, res) {
    const userFlow = req.header('UserID');
    const { iduser } = req;
    const validation = await UserModel.findById({ _id: userFlow });

    if (validation) {
      const model = new FlowModel(
        {
          active: true,
          idflowed: userFlow,
          iduser,
        },
      );

      const notificacao = new Notification(
        {
          iduser: validation._id,
          type: 'Flow',
          content: `${validation.username} começou a seguir você`,
        },
      );

      notificacao.save();

      return res.json(await model.save());
    }
    return res.status(400).json({ error: 'User not valid' });
  }

  async index(req, res) {
    const { iduser } = req;

    return res.json(
      await FlowModel.find({ user_id: iduser })
        .sort('createAt')
        .limit(20),
    );
  }
}

export default new Flow();
