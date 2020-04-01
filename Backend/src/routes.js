import express from 'express';
import sessionController from './app/controllers/sessionController';
import userController from './app/controllers/userController';
import middlewareAuth from './app/middlewares/auth';
import './server';

const routes = express.Router();

routes.post('/cadastrar', userController.create);
routes.post('/session', sessionController.store);

/* ROTAS QUE PRECISAM DE AUTENTICAÇÃO ABAIXO */
routes.use(middlewareAuth);
routes.put('/user', userController.update);

export default routes;
