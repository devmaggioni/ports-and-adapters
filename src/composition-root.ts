import HTTPServerAdapter from "@adapters/in/http/http-server.adapter";
import UserRepository from "@adapters/out/repositories/user.repository";
import UserUseCase from "@usecases/user.usecase";
import UserController from "@adapters/in/http/controllers/user.controller";
import registerUserRoutes from "@adapters/in/http/routes/user.routes";
import { client as prismaClient } from "@database/client";

export function start() {
  const server = new HTTPServerAdapter();

  const userRepo = new UserRepository(prismaClient);
  const userUseCase = new UserUseCase(userRepo);
  const userController = new UserController(userUseCase);

  registerUserRoutes(server, userController);

  server.listen({ port: 3000 });
}
