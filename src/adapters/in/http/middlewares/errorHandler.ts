import HTTPServerAdapter, { ResponseType } from "../http-server.adapter";

export function errorHandler(
  server: HTTPServerAdapter,
  res: ResponseType,
  props: { statusCode?: number; message: any }
) {
  server.send(res, {
    statusCode: props.statusCode || 500,
    data: {
      message: "Error",
      error: props.message,
    },
  });
}
