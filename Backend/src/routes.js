import express from 'express';
import multer from 'multer';

import './server';

import middlewareAuth from './app/middlewares/auth';

import multerConfig from './config/multer';
import sessionController from './app/controllers/sessionController';
import userController from './app/controllers/userController';
import publicController from './app/controllers/publicController';
import flowController from './app/controllers/flowController';
import notificationController from './app/controllers/notificationController';
import LikeController from './app/controllers/LikeController';
import CommentController from './app/controllers/CommentController';

const upload = multer(multerConfig);

const routes = express.Router();

routes.get('/', (req, res) => res.json({ Test: 'OKAY' }));
routes.post('/cadastrar', userController.store);
routes.post('/session', sessionController.store); // LogIn

/* ROTAS QUE PRECISAM DE AUTENTICAÇÃO ABAIXO */
routes.use(middlewareAuth);

routes.put('/user', userController.update);
routes.get('/profile', userController.profile);
routes.get('/user', userController.userInfo);
routes.get('/user/index', userController.index);
routes.put('/user/photo', upload.single('file'), userController.set_photo);
routes.get('/user/photo', userController.getPhoto);

routes.post('/public', upload.single('file'), publicController.store);
routes.post('/public/pic', publicController.getPic);
routes.get('/public/like/:id', LikeController.store);
routes.get('public/like', LikeController.index);
routes.post('/public/comment', CommentController.store);
routes.post('/public/desc', publicController.postdesc);
routes.get('/public/:id', publicController.indexuser);

routes.get('/public/comment/:id', CommentController.index);

routes.post('/public/profile', userController.getProfilePhoto);
routes.post('/public/profile/user', userController.getUserFromID);

routes.get('/feed', publicController.index);

routes.get('/flow/:id', flowController.store);
routes.get('/flow', flowController.index);

routes.get('/notifications', notificationController.index);

export default routes;
