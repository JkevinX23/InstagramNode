import publicModel from '../models/publicModel';
import FirebaseAcess from '../../config/firebase';


class PublicController {
  async create(req, res) {
    //const {descricao} = req.body;
    
    const id_user = req.userId;
    
    FirebaseAcess.uploadFile(req.file.path);
    
    const path = req.file.filename;
    
    const publicacao = await new publicModel(
      {
        //descricao: descricao,
        id_user: id_user,
        path: path
      }
    );
    
    return res.json(await publicacao.save())  ;
  }}

export default new PublicController();
