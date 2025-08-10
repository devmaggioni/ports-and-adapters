export default interface IController {
  create(server: unknown, req: unknown, res: unknown): Promise<void>;
}
