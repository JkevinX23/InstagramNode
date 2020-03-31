import express from "express";

import userController from "./app/controllers/userController";
import "./server";

const routes = express.Router();

routes.post("/", userController.store);

export default routes;
