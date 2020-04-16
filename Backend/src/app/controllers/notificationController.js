import notification from '../models/notificationModel';

class NotificationController {
  async index(req, res) {
    const notifications = await notification.find({
      iduser: req.iduser,
    })
      .sort('createAt')
      .limit(20);

    return res.json(notifications);
  }
}

export default new NotificationController();
