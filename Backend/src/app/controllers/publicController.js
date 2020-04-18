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

    const p = [];

    for (let i = 0; i < publicacoes.length; i += 1) {
      for (let j = 0; j < publicacoes[i].length; j += 1) {
        p.push(publicacoes[i][j]);
      }
    }

    p.sort((a, b) => b.created_at - a.created_at);

    return res.json(p);
  }

  async getPic(req, res) {
    const { path } = req.body;
    const fileUrl = await FirebaseAcess.getFile(path);
    res.json({ fileUrl });
  }
}

export default new PublicController();
