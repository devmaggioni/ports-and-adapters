import User from "@domain/entities/User.entity";
import { Either, logger } from "@devmaggioni/either-monad";
import IUsecase from "@contracts/usecase.contract";
import IRepository from "@contracts/repository.contract";

export default class UserUseCase implements IUsecase {
  readonly repo: IRepository;
  constructor(userRepo: IRepository) {
    this.repo = userRepo;
  }

  async create(user: User): Promise<Either<any, any>> {
    logger.info("Passou pelo use case");
    let data = await this.repo.save(user);
    return data;
  }
}
