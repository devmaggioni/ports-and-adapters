import { Either } from "@devmaggioni/either-monad";

export default abstract class IRepository {
  readonly client: unknown;
  constructor(client: unknown) {
    this.client = client;
  }
  abstract save(data: any): Promise<Either<any, any>>;
}
