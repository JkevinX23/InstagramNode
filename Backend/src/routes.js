import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import sessionController from './app/controllers/sessionController';
import userController from './app/controllers/userController';
import middlewareAuth from './app/middlewares/auth';
import './server';
import publicController from './app/controllers/publicController';
import flowController from './app/controllers/flowController';
import firebase from './config/firebase';
import notificationController from './app/controllers/notificationController';

const upload = multer(multerConfig);

const routes = express.Router();

routes.post('/cadastrar', userController.create);
routes.post('/session', sessionController.store);

/* ROTAS QUE PRECISAM DE AUTENTICAÇÃO ABAIXO */
routes.use(middlewareAuth);

routes.put('/user', userController.update);
routes.get('/profile', userController.profile);

routes.post('/publicar', upload.single('file'), publicController.create);

routes.post('/flow', flowController.store);
routes.get('/flow', flowController.index);

routes.get('/notifications', notificationController.index);


//routes.get('/feed', (req,res) => {res.json(firebase.getFile("0a6f0c8533b368f3070169b6e410b12a.jpg").catch(console.error))});
/* routes.post('/files', upload.single('file'), (req,res) =>{
  return res.json({ ok:true});
}); */

export default routes;
