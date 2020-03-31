import express from "express";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
  }

  routes() {
    this.server.listen(3000);
    this.server.use(routes);
  }
}
export default new App().server;
