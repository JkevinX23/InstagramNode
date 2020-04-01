import express from "express";
import sessionController from "./app/controllers/sessionController";
import userController from "./app/controllers/userController";
import "./server";

const routes = express.Router();

routes.post("/cadastrar", userController.create);
routes.post("/session", sessionController.store);

export default routes;
