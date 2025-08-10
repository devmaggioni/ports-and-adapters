import User from "@domain/entities/User.entity";
import { Either } from "@devmaggioni/either-monad";

export default interface IUsecase {
  create(user: User): Promise<Either<any, any>>;
}
