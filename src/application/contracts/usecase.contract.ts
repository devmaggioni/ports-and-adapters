import { Either } from "@devmaggioni/either-monad";

export default abstract class IUsecase {
  readonly repo: unknown;

  constructor(repo: unknown) {
    this.repo = repo;
  }

  abstract create(data: unknown): Promise<Either<any, any>>;
}
