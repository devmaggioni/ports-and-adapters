import UserController from "./user.controller";
import User from "@domain/entities/User.entity";
import NameVO from "@domain/value-objects/name.vo";

const mockSend = jest.fn();
const mockErrorHandler = jest.fn();

jest.mock("../middlewares/errorHandler", () => ({
  errorHandler: (...args: any[]) => mockErrorHandler(...args),
}));

import { errorHandler } from "../middlewares/errorHandler";

describe("UserController", () => {
  let controller: UserController;
  let mockUsecase: any;
  let mockServer: any;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockUsecase = {
      create: jest.fn(),
    };
    mockServer = {
      send: mockSend,
    };
    mockReq = {
      body: {},
    };
    mockRes = {};
    mockSend.mockClear();
    mockErrorHandler.mockClear();
    controller = new UserController(mockUsecase);
  });

  it("should call errorHandler if name is missing", async () => {
    mockReq.body = {};
    await controller.create(mockServer, mockReq, mockRes);
    expect(mockErrorHandler).toHaveBeenCalledWith(
      mockServer,
      mockRes,
      expect.objectContaining({
        message: "name is not provided in req.body",
      })
    );
    expect(mockUsecase.create).not.toHaveBeenCalled();
  });

  it("should call usecase.create and send 200 if result is right", async () => {
    mockReq.body = { name: "Gabriel" };
    const user = new User({ name: NameVO.create("Gabriel") });
    mockUsecase.create.mockResolvedValue({
      isRight: () => true,
      isLeft: () => false,
      value: { message: "success" },
    });

    await controller.create(mockServer, mockReq, mockRes);

    expect(mockUsecase.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expect.objectContaining({ getValue: expect.any(Function) }),
      })
    );
    expect(mockSend).toHaveBeenCalledWith(mockRes, {
      statusCode: 200,
      data: expect.objectContaining({ value: { message: "success" } }),
    });
  });

  it("should call usecase.create and send 400 if result is left", async () => {
    mockReq.body = { name: "Gabriel" };
    mockUsecase.create.mockResolvedValue({
      isRight: () => false,
      isLeft: () => true,
      value: { message: "error" },
    });

    await controller.create(mockServer, mockReq, mockRes);

    expect(mockSend).toHaveBeenCalledWith(mockRes, {
      statusCode: 400,
      data: expect.objectContaining({ value: { message: "error" } }),
    });
  });
});
