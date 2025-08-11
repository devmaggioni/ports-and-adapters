import { Either, left, logger, right } from "@devmaggioni/either-monad";
import User from "@domain/entities/User.entity";
import { PrismaClient } from "@prisma/client";
import IRepository from "@contracts/repository.contract";

export default class UserRepository implements IRepository {
  readonly client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  async save(user: User): Promise<Either<any, {}>> {
    logger.info("Passou pelo DB");
    try {
      const create = await this.client.user.create({
        data: {
          name: user.name.getValue(),
        },
      });
      return right(create);
    } catch (e) {
      return left(e);
    }
  }
}
