export default abstract class IController {
  readonly usecase: unknown;

  constructor(usecase: unknown) {
    this.usecase = usecase;
  }
  abstract create(server: unknown, req: unknown, res: unknown): Promise<void>;
}
