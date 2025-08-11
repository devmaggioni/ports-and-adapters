import NameVO from "@domain/value-objects/name.vo";
import User from "./User.entity";

describe("User entity test", () => {
  it("create User entity", () => {
    const name = NameVO.create("Gabriel");
    const user = new User({
      name,
    });
    expect(user).toEqual({
      name,
    });
  });

  it("do not create User with fewer 2 letters", () => {
    expect(() => {
      NameVO.create("aa");
    }).toThrow();
  });

  it("do not create User with more than 100 letters", () => {
    expect(() => {
      NameVO.create("a".repeat(101));
    }).toThrow();
  });
});
