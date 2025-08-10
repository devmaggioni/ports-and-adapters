import { Either, left, logger, right } from "@devmaggioni/either-monad";
import User from "@domain/entities/User.entity";
import { PrismaClient } from "@prisma/client";
import IRepository from "@contracts/repository.contract";

export default class UserRepository implements IRepository {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  async save(user: User): Promise<Either<any, User>> {
    logger.info("Passou pelo DB");
    try {
      const create = await this.client.user.create({
        data: user,
      });
      return right(create);
    } catch (e) {
      return left(e);
    }
  }
}
