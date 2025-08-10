import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { Either, left, right, logger } from "@devmaggioni/either-monad";
import IHTTPServer from "@contracts/http.contract";

export type RequestType = FastifyRequest;
export type ResponseType = FastifyReply;

export default class HTTPServerAdapter implements IHTTPServer {
  private instance = fastify();

  async useHelmet() {
    const helmet = require("@fastify/helmet");
    this.instance.register(helmet.default());
  }

  useCors(origin = ["*"], methods = ["GET", "POST", "PUT", "DELETE", "PATCH"]) {
    const cors = require("@fastify/cors");
    this.instance.register(cors, {
      origin: origin,
      methods: methods,
    });
  }

  send(res: ResponseType, props: { statusCode: number; data: any }) {
    res.code(props.statusCode).send(props);
  }
  get(path: string, handler: (req: RequestType, res: ResponseType) => void) {
    this.instance.get(path, handler);
  }
  post(path: string, handler: (req: RequestType, res: ResponseType) => void) {
    this.instance.post(path, handler);
  }
  put(path: string, handler: (req: RequestType, res: ResponseType) => void) {
    this.instance.get(path, handler);
  }
  patch(path: string, handler: (req: RequestType, res: ResponseType) => void) {
    this.instance.patch(path, handler);
  }
  delete(path: string, handler: (req: RequestType, res: ResponseType) => void) {
    this.instance.delete(path, handler);
  }

  async listen(props: {
    port: number;
    host?: string;
  }): Promise<Either<any, Record<string, any>>> {
    try {
      await this.instance.listen({
        port: props.port,
        host: props.host ?? "",
      });
      logger.info(`server running in http://localhost:3000`);
      return right(props);
    } catch (e) {
      return left(props);
    }
  }
}
