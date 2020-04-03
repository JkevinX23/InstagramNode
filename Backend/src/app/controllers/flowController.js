import FlowModel from '../models/flows';
import UserModel from '../models/userModel';
import notification from '../models/notificationModel';

class Flow{
  async store(req,res){
    const userFlow = req.header("UserID");
    const userId = req.userId;
    const validation = await UserModel.findById({"_id": userFlow});
    
    if(validation)
      {
        const model = new FlowModel(
          {
            active: true,
            flowed_id: userFlow,
            user_id: userId
          });

        const notificacao = new notification(
          {
            id_user: validation._id,
            type: "Flow",
            content: `${validation.username} começou a seguir você`,
          });
      
        notificacao.save();
      
      return res.json(await model.save());
    }
    return res.status(400).json({error: "User not valid"});
  }

  async index(req,res)
    {
      const userId = req.userId;
    
      return res.json(
        await FlowModel.find({user_id: userId})
          .sort('createAt')
          .limit(20)
        );
  }
}

export default new Flow();