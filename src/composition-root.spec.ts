import { start } from "./composition-root";
import HTTPServerAdapter from "@adapters/in/http/http-server.adapter";
import UserRepository from "@adapters/out/repositories/user.repository";
import UserUseCase from "@usecases/user.usecase";
import UserController from "@adapters/in/http/controllers/user.controller";
import registerUserRoutes from "@adapters/in/http/routes/user.routes";
import { client as prismaClient } from "@database/client";

jest.mock("@adapters/in/http/http-server.adapter");
jest.mock("@adapters/out/repositories/user.repository");
jest.mock("@usecases/user.usecase");
jest.mock("@adapters/in/http/controllers/user.controller");
jest.mock("@adapters/in/http/routes/user.routes");
jest.mock("@database/client");

describe("start function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize and start the server with user routes", () => {
    const mockListen = jest.fn();
    (HTTPServerAdapter as jest.Mock).mockImplementation(() => ({
      listen: mockListen,
    }));

    (UserRepository as jest.Mock).mockImplementation(() => ({}));
    (UserUseCase as jest.Mock).mockImplementation(() => ({}));
    (UserController as jest.Mock).mockImplementation(() => ({}));
    (registerUserRoutes as jest.Mock).mockImplementation(() => {});

    start();

    expect(HTTPServerAdapter).toHaveBeenCalledTimes(1);
    expect(UserRepository).toHaveBeenCalledWith(prismaClient);
    expect(UserUseCase).toHaveBeenCalled();
    expect(UserController).toHaveBeenCalled();
    expect(registerUserRoutes).toHaveBeenCalled();
    expect(mockListen).toHaveBeenCalledWith({ port: 3000 });
  });
});
