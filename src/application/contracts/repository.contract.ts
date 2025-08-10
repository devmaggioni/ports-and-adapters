import User from "@domain/entities/User.entity";
import { Either } from "@devmaggioni/either-monad";

export default interface IRepository {
  save(user: User): Promise<Either<any, User>>;
}
