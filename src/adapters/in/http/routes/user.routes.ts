import { logger } from "@devmaggioni/either-monad";
import UserController from "../controllers/user.controller";
import HTTPServerAdapter from "../http-server.adapter";

export default function registerUserRoutes(
  server: HTTPServerAdapter,
  userController: UserController
) {
  console.log("User route registrado!");

  server.post("/users", async (req, res) => {
    logger.info("Passou pelo route");
    await userController.create(server, req, res);
  });
}
