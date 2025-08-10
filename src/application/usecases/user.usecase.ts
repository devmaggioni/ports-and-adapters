import User from "@domain/entities/User.entity";
import UserRepository from "adapters/out/repositories/user.repository";
import { Either, logger } from "@devmaggioni/either-monad";
import IUsecase from "@contracts/usecase.contract";

export default class UserUseCase implements IUsecase {
  private repo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.repo = userRepo;
  }

  async create(user: User): Promise<Either<any, any>> {
    logger.info("Passou pelo use case");
    let data = await this.repo.save(user);
    return data;
  }
}
