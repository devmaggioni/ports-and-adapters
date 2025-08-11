import UserUseCase from "./user.usecase";
import User from "@domain/entities/User.entity";
import NameVO from "@domain/value-objects/name.vo";

class FakeRepo {
  async save(data: any) {
    return { type: "right", value: data };
  }
}

describe("UserUseCase", () => {
  it("returns right on success", async () => {
    const repo = new FakeRepo();
    const useCase = new UserUseCase(repo);
    const user = new User({ name: NameVO.create("gabriel") });
    const res = await useCase.create(user);
    expect(res.type).toBe("right");
  });

  it("returns left on error", async () => {
    class ErrorRepo {
      async save() {
        return { type: "left", value: new Error("fail") };
      }
    }
    const repo = new ErrorRepo();
    const useCase = new UserUseCase(repo);
    const user = new User({ name: NameVO.create("gabriel") });
    const res = await useCase.create(user);
    expect(res.type).toBe("left");
  });
});
