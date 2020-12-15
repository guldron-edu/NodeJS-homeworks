const assert = require("assert");
const sinon = require("sinon");
const { HttpCode } = require("../src/helpers/constants.js");
const { authService, usersService } = require("../src/services");

const authController = require("../src/controllers/authController");

describe("Testing authController", () => {
  let req, res, next;

  const code200 = HttpCode.OK;
  const code201 = HttpCode.CREATED;
  const code204 = HttpCode.NO_CONTENT;
  const code401 = HttpCode.UNAUTORIZED;
  const code409 = HttpCode.CONFLICT;

  const userId = "5fc8082f097a051aecaf0ae6";
  const fakeEmail = "test34512@gmail.com";
  const fakePassword = "Qazxsw2";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDNlZDUxZDg3ZTdmMTI0MDk0MDI0NCIsImlhdCI6MTYwNzg5MTI5OSwiZXhwIjoxNjA3OTc3Njk5fQ.pwxlobS86fwPqW5LI2UBY1IdWjMvYZZEIXUSJLea7XQ";
  const fakeSubscription = "pro";
  const fakeAvatar = "some Avatar";
  const user = {
    email: fakeEmail,
    subscription: fakeSubscription,
    avatar: fakeAvatar,
  };

  const statusMock = sinon.mock().atLeast(1).returnsThis();
  const jsonMock = sinon.fake((data) => data);
  const nextMock = sinon.fake((data) => data);
  beforeEach(() => {
    req = {
      user: { id: userId },
      body: {
        email: fakeEmail,
        password: fakePassword,
        subscription: fakeSubscription,
      },
    };
    (res = {
      status: statusMock,
      json: jsonMock,
    }),
      (next = nextMock);
  });

  afterEach(async () => {
    sinon.resetHistory();
    sinon.restore();
  });

  describe("testing reg", () => {
    it("reg should return code 200", async () => {
      const expectedResult = {
        status: code201,
        data: {
          email: fakeEmail,
          subscription: fakeSubscription,
          avatar: fakeAvatar,
        },
      };

      const authStubGetByEmail = sinon
        .stub(usersService, "getByEmail")
        .resolves(undefined);
      const authStubAddUser = sinon
        .stub(usersService, "addUser")
        .resolves(user);

      const result = await authController.reg(req, res, next);

      sinon.assert.calledWith(authStubGetByEmail, fakeEmail);
      sinon.assert.calledWith(authStubAddUser, req.body);

      sinon.assert.calledWith(statusMock, code201);
      sinon.assert.calledWith(jsonMock, expectedResult);
      assert.deepStrictEqual(result, expectedResult);
    });

    it("reg should return code 409", async () => {
      const expectedResult = {
        status: code409,
        message: "Email in use",
      };
      const authStub = sinon.stub(usersService, "getByEmail").resolves(user);
      const result = await authController.reg(req, res, next);

      sinon.assert.calledWith(authStub, fakeEmail);
      assert.deepStrictEqual(result, expectedResult);
    });

    it("reg should throw error", async () => {
      const expected = "err";
      sinon.stub(usersService, "getByEmail").throws(new Error(expected));

      try {
        await authController.reg(req, res, next);
      } catch (e) {
        assert(e.message.includes(expected));
      }
    });
  });

  describe("testing login", () => {
    it("login should return code 200", async () => {
      const expectedResult = {
        status: code200,
        data: {
          token,
          user: {
            email: fakeEmail,
            subscription: fakeSubscription,
          },
        },
      };

      const authStub = sinon
        .stub(authService, "login")
        .resolves({ user, token });
      const result = await authController.login(req, res, next);

      sinon.assert.calledWith(authStub, fakeEmail, fakePassword);
      sinon.assert.calledWith(statusMock, code200);
      sinon.assert.calledWith(jsonMock, expectedResult);
      assert.deepStrictEqual(result, expectedResult);
    });

    it("login should return code 401", async () => {
      const expectedResult = {
        status: code401,
        message: "Email or password is wrong",
      };
      const authStub = sinon.stub(authService, "login").resolves(null);
      const result = await authController.login(req, res, next);
      sinon.assert.calledWith(authStub, fakeEmail, fakePassword);
      sinon.assert.calledWith(statusMock, code401);
      sinon.assert.calledWith(jsonMock, expectedResult);
      assert.deepStrictEqual(result, expectedResult);
    });

    it("login should throw error", async () => {
      const expected = "err";
      sinon.stub(authService, "login").throws(new Error(expected));

      try {
        await authController.login(req, res, next);
      } catch (e) {
        assert(e.message.includes(expected));
      }
    });
  });

  describe("testing logout", () => {
    it("logout should return code 204", async () => {
      const expectedResult = { status: code204 };
      const authStub = sinon.stub(authService, "logout").resolves();

      const result = await authController.logout(req, res, next);

      sinon.assert.calledWith(authStub, userId);

      sinon.assert.calledWith(statusMock, code204);
      sinon.assert.calledWith(jsonMock, expectedResult);
      assert.deepStrictEqual(result, expectedResult);
    });
    it("logout should throw error", async () => {
      const expected = "err";
      sinon.stub(authService, "logout").throws(new Error(expected));

      try {
        await authController.logout(req, res, next);
      } catch (e) {
        assert(e.message.includes(expected));
      }
    });
  });
});
