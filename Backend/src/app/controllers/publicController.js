import publicModel from '../models/publicModel';
import FirebaseAcess from '../../config/firebase';
import flowModel from '../models/flows';
import publicationModel from '../models/publicModel';


class PublicController {
  async create(req, res) {
    // const {descricao} = req.body;

    const id_user = req.userId;

    FirebaseAcess.uploadFile(req.file.path);

    const path = req.file.filename;

    const publicacao = await new publicModel(
      {
        // descricao: descricao,
        id_user,
        path,
      },
    );

    return res.json(await publicacao.save());
  }

  async listage(req,res){
    const currentUser = req.userId;
    const flowers = await flowModel.find({"user_id": currentUser, "active": true});
    var publicacoes = new Array();
    for (let i = 0; i < flowers.length; i++) {
      publicacoes.push(await publicationModel.find({id_user: flowers[i].flowed_id}));
    }
    return res.json(publicacoes);
  }
}

export default new PublicController();
