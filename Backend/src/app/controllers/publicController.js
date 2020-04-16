import PublicModel from '../models/publicModel';
import FirebaseAcess from '../../config/firebase';
import FlowModel from '../models/flows';


class PublicController {
  async store(req, res) {
    // const {descricao} = req.body;

    const { iduser } = req;

    FirebaseAcess.uploadFile(req.file.path);

    const path = req.file.filename;

    const publicacao = await new PublicModel(
      {
        // descricao: descricao,
        iduser,
        path,
      },
    );

    return res.json(await publicacao.save());
  }

  async index(req, res) {
    const currentUser = req.iduser;
    const flowers = await FlowModel.find({ iduser: currentUser, active: true });
    const publicacoes = [];
    for (let i = 0; i < flowers.length; i++) {
      publicacoes.push(await PublicModel
        .find({ iduser: flowers[i].idflowed }));
    }

    return res.json(publicacoes);
  }
}

export default new PublicController();
