import UserUseCase from "@usecases/user.usecase";
import User from "@domain/entities/User.entity";
import HTTPServerAdapter, {
  RequestType,
  ResponseType,
} from "../http-server.adapter";
import { errorHandler } from "../middlewares/errorHandler";
import { logger } from "@devmaggioni/either-monad";
import IController from "@contracts/controller.contract";
import IUsecase from "@contracts/usecase.contract";

export default class UserController implements IController {
  private usecase: IUsecase;

  constructor(usecase: IUsecase) {
    this.usecase = usecase;
  }

  async create(server: HTTPServerAdapter, req: RequestType, res: ResponseType) {
    logger.info("Passou pelo controller");

    const { name }: { name: string } = req.body as any;
    if (!name)
      return errorHandler(server, res, {
        message: "name is not provided in req.body",
      });

    const user = new User({
      name,
    });

    const data = await this.usecase.create(user);
    server.send(res, {
      statusCode: data.isRight() ? 200 : 400,
      data,
    });
  }
}
