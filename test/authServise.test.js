const assert = require("assert");
const sinon = require("sinon");
// const { HttpCode } = require("../src/helpers/constants.js");
const jwt = require("jsonwebtoken");
const pass = require("../src/helpers/pass.js");
const authService = require("../src/services/authService");

describe("Testing authServices", () => {
  const userId = "5fc8082f097a051aecaf0ae6";
  const fakeEmail = "test34512@gmail.com";
  const fakePassword = "Qazxsw2";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzgwODJmMDk3YTA1MWFlY2FmMGFlNiIsImlhdCI6MTYwODA2MDM5OCwiZXhwIjoxNjA4MTQ2Nzk4fQ.gsl3yRchu2DPKpQel_6XhGt-xyvy_RW3EtftCrXXw5k";
  const user = {
    email: fakeEmail,
    password: fakePassword,
    id: userId,
  };

  afterEach(async () => {
    sinon.resetHistory();
    sinon.restore();
  });
  describe("testing login in Services", () => {
    it("login should succeed", async () => {
      const expectedResult = { user, token };

      const checkStub = sinon.stub(pass, "check").resolves(true);
      sinon.stub(jwt, "sign").resolves(token);

      const authStubGetByEmail = sinon
        .stub(authService.repositories.users, "getByEmail")
        .resolves({
          email: fakeEmail,
          password: fakePassword,
          id: userId,
        });
      const authStubUpdateToken = sinon
        .stub(authService.repositories.users, "updateToken")
        .resolves(userId, token);

      const result = await authService.login(fakeEmail, fakePassword);

      sinon.assert.calledWith(checkStub, fakePassword, user.password);
      sinon.assert.calledWith(authStubGetByEmail, fakeEmail);
      sinon.assert.calledWith(authStubUpdateToken, userId, token);
      assert.deepStrictEqual(result, expectedResult);
    });
    it("testing login. getByEmail return fail", async () => {
      const expectedResult = null;
      const authStub = sinon
        .stub(authService.repositories.users, "getByEmail")
        .resolves(undefined);

      const result = await authService.login(fakeEmail, fakePassword);

      sinon.assert.calledWith(authStub, fakeEmail);
      assert.deepStrictEqual(result, expectedResult);
    });
    it("testing login. check password return false", async () => {
      const expectedResult = null;
      const authStubGetByEmail = sinon
        .stub(authService.repositories.users, "getByEmail")
        .resolves({
          email: fakeEmail,
          password: fakePassword,
          id: userId,
        });
      const checkStub = sinon.stub(pass, "check").resolves(false);

      const result = await authService.login(fakeEmail, fakePassword);

      sinon.assert.calledWith(authStubGetByEmail, fakeEmail);
      sinon.assert.calledWith(authStubGetByEmail, fakeEmail);
      sinon.assert.calledWith(checkStub, fakePassword, user.password);
      assert.deepStrictEqual(result, expectedResult);
    });
    it("login should return code error", async () => {
      const expected = "error";
      const authStub = sinon
        .stub(authService.repositories.users, "getByEmail")
        .throws(new Error(expected));

      try {
        await authService.login(fakeEmail, fakePassword);
      } catch (e) {
        assert(e.message.includes(expected));
      }
      sinon.assert.calledWith(authStub, fakeEmail);
    });
  });

  describe("testing logout in Services", () => {
    it("logout should succeed", async () => {
      const authStub = sinon
        .stub(authService.repositories.users, "updateToken")
        .resolves();

      await authService.logout(userId);

      sinon.assert.calledWith(authStub, userId);
    });
    it("logout should return code error", async () => {
      const expected = "error";
      const authStub = sinon
        .stub(authService.repositories.users, "updateToken")
        .throws(new Error(expected));

      try {
        await authService.logout(userId);
      } catch (e) {
        assert(e.message.includes(expected));
      }
      sinon.assert.calledWith(authStub, userId);
    });
  });
});
