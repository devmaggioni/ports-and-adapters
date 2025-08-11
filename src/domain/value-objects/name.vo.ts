export default class NameVO {
  private readonly value: string;

  private constructor(value: string) {
    if (!value || value.trim().length === 0 || value.trim().length < 3) {
      throw new Error("Name cannot be empty");
    }
    if (value.length > 100) throw new Error("Nome é muito longo");
    this.value = value.trim();
  }

  static create(value: string): NameVO {
    return new NameVO(value);
  }

  getValue(): string {
    return this.value;
  }
}
