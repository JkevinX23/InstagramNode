import FlowModel from '../models/flows';
import Notification from '../models/notificationModel';

class Flow {
  async store(req, res) {
    const { id } = req.params;
    const { iduser } = req;
    const { username } = req;

    const followed = await FlowModel.findOne({ iduser, idflowed: id });

    if (!followed.active) {
      const response = await followed.updateOne({ active: true });

      return res.json({ response });
    }

    if (followed.active) {
      return res.json({ status: true });
    }
    const model = new FlowModel(
      {
        active: true,
        idflowed: id,
        iduser,
      },
    );

    const notificacao = new Notification(
      {
        iduser: id,
        type: 'Flow',
        content: `${username} começou a seguir você`,
      },
    );

    notificacao.save();

    return res.json(await model.save());
  }

  async index(req, res) {
    const { iduser } = req;

    return res.json(
      await FlowModel.find({ iduser })
        .sort('createAt'),
    );
  }
}

export default new Flow();
