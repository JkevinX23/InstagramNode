import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import sessionController from './app/controllers/sessionController';
import userController from './app/controllers/userController';
import middlewareAuth from './app/middlewares/auth';
import './server';
import publicController from './app/controllers/publicController';

const upload = multer(multerConfig);

const routes = express.Router();

routes.post('/cadastrar', userController.create);
routes.post('/session', sessionController.store);

/* ROTAS QUE PRECISAM DE AUTENTICAÇÃO ABAIXO */
routes.use(middlewareAuth);
routes.put('/user', userController.update);
routes.post('/publicar',upload.single('file'),publicController.create);
/*routes.post('/files', upload.single('file'), (req,res) =>{
  return res.json({ ok:true});
});*/

export default routes;
