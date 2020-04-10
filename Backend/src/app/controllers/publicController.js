import PublicModel from '../models/publicModel';
import FirebaseAcess from '../../config/firebase';
import FlowModel from '../models/flows';
import userModel from '../models/userModel';


class PublicController {
  async store(req, res) {
    // const {descricao} = req.body;

    const id_user = req.userId;

    FirebaseAcess.uploadFile(req.file.path);

    const path = req.file.filename;

    const publicacao = await new PublicModel(
      {
        // descricao: descricao,
        id_user,
        path,
      },
    );

    return res.json(await publicacao.save());
  }

  async index(req, res) {
    const currentUser = req.userId;
    const flowers = await FlowModel.find({ user_id: currentUser, active: true });
    const publicacoes = new Array();
    for (let i = 0; i < flowers.length; i++) {
      publicacoes.push(await PublicModel
        .find(
          { id_user: flowers[i].flowed_id },
        )
        .sort([
          ['updatedAt', 'descending']]));
    }

    return res.json(publicacoes);
  }
}

export default new PublicController();
