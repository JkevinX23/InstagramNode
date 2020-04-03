import FlowModel from '../models/flows';
import UserModel from '../models/userModel';

class Flow{
  async create(req,res){
    const userFlow = req.header("UserID");
    const userId = req.userId;
    const validation = await UserModel.findById({"_id": userFlow});
    if(validation){
      const model = new FlowModel({
        active: true,
        flowed_id: userFlow,
        user_id: userId
      });
      return res.json(await model.save());
    }
    return res.status(400).json({error: "User not valid"})
  }

  async listage(req,res){
    const userId = req.userId;
    return res.json(await FlowModel.find({user_id: userId}))
  }


}

export default new Flow();