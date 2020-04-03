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

const upload = multer(multerConfig);

const routes = express.Router();

routes.post('/cadastrar', userController.store);
routes.post('/session', sessionController.store); // LogIn

/* ROTAS QUE PRECISAM DE AUTENTICAÇÃO ABAIXO */
routes.use(middlewareAuth);

routes.put('/user', userController.update);
routes.get('/profile', userController.profile);

routes.post('/', upload.single('file'), publicController.store);
routes.get('/', publicController.index);

routes.post('/flow', flowController.store);
routes.get('/flow', flowController.index);

routes.get('/notifications', notificationController.index);

export default routes;
