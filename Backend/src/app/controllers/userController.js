import UserModel from "../models/userModel";

class UserController {
  async create(req, res) {
    const { name, email, username, senha, nascimento } = req.body;
    const user = new UserModel({
      name,
      email,
      username,
      senha,
      nascimento,
    });

    const auth = await UserModel.findOne({email:email}).exec();
    if(auth)return res.status(400).json({error:'User already exists.'});
    return res.json(await user.save());


    /*
    const userExist = UserModel.findOne({email:email});
    console.log(userExist);
    if(userExist){
      return res.status(400).json({error:'User already exists.'});
    }
    return res.json(await user.save());

 var resp = 0;
    var query = UserModel.where({email:email});
    query.findOne(function (err, user){
      if(err) resp = 1;
      if(user)resp = 2;
    });
    if(resp == 0)return res.json(await user.save());
    if(resp == 1)return res.status(400).json({error:"Error"});
    if(resp == 2) return res.status(401).json({error:'Email already exists.'});
  }
  }*/
  }}
export default new UserController();
