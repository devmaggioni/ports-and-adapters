import { Either } from "@devmaggioni/either-monad";

export default interface IHTTPServer {
  useHelmet(): void;
  useCors(): void;
  send(res: unknown, props: { statusCode: number; data: any }): void;
  get(path: string, handler: (req: unknown, res: unknown) => void): void;
  post(path: string, handler: (req: unknown, res: unknown) => void): void;
  put(path: string, handler: (req: unknown, res: unknown) => void): void;
  patch(path: string, handler: (req: unknown, res: unknown) => void): void;
  delete(path: string, handler: (req: unknown, res: unknown) => void): void;
  listen(props: {
    port: number;
    host?: string;
  }): Promise<Either<any, Record<string, any>>>;
}
