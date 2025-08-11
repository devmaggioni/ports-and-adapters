import UserRepository from "./user.repository";
import User from "@domain/entities/User.entity";
import NameVO from "@domain/value-objects/name.vo";
import { left, right } from "@devmaggioni/either-monad";

const mockCreate = jest.fn();

const mockPrismaClient = {
  user: {
    create: mockCreate,
  },
};

describe("UserRepository", () => {
  let repo: UserRepository;

  beforeEach(() => {
    mockCreate.mockReset();
    repo = new UserRepository(mockPrismaClient as any);
  });

  it("should return right when user is created successfully", async () => {
    const fakeUser = new User({ name: NameVO.create("Gabriel") });
    const fakeCreateReturn = { id: 1, name: "Gabriel" };
    mockCreate.mockResolvedValue(fakeCreateReturn);

    const result = await repo.save(fakeUser);

    expect(mockCreate).toHaveBeenCalledWith({
      data: { name: "Gabriel" },
    });
    expect(result).toEqual(right(fakeCreateReturn));
  });

  it("should return left when client create throws", async () => {
    const fakeUser = new User({ name: NameVO.create("Gabriel") });
    const error = new Error("DB error");
    mockCreate.mockRejectedValue(error);

    const result = await repo.save(fakeUser);

    expect(result).toEqual(left(error));
  });
});
