const assert = require("assert");
const sinon = require("sinon");
const { HttpCode } = require("../src/helpers/constants.js");
const { AuthService, UsersService } = require("../src/services");

const authService = new AuthService();
const usersService = new UsersService();
const authController = require("../src/controllers/authController");
// const {
//   contacts: fakeContacts,
//   newContact,
// } = require("../services/__mocks__/data-contacts");
sinon.mock("../src/services/authService.js");
sinon.mock("../src/services/userService.js");

describe("Testing authController", () => {
  let req, res, next;
  beforeEach(() => {
    req = { user: { id: "5fc8082f097a051aecaf0ae6" } };
    (res = {
      status: sinon.mock().returnsThis(),
      json: sinon.fake((data) => data),
    }),
      (next = () => {});
  });
  describe("testing logout", () => {
    it("should return code 204", async () => {
      // const resMock = sinon.mock(res);

      const result = await authController.logout(req, res, next);
     
      // resMock.expects("status").once().withArgs(HttpCode.NO_CONTENT);
      // resMock.expects("send").once().withArgs({ status: HttpCode.NO_CONTENT });
      // assert.deepStrictEqual(result, HttpCode.NO_CONTENT);
      // expect(ContactsService).toHaveBeenCalled();
      // expect(result).toBeDefined(); // должен быть определен
      // expect(result).toHaveProperty("status", 200); // проверка приходящих свойств. первым свойство, вторым - чему должно быть равно
      // expect(result).toHaveProperty("data");
    });
  });
//   describe("testing login", () => {
//     it("should get error when login", async (done) => {
//       console.log("+");
//       const result = await authController.login("", res, next);
//       expect(next).toHaveBeenCalledTimes(1);
//       done();
//     });

//     it("should return token", async () => {
//       const email = "zzz@i.ua";
//       const password = "Qazaaaaaaaa1a";
//       req.body = { email, password };

//       const result = await authController.login(req, res, next);
//       console.log(
//         "🚀 ~ file: authController.test.js ~ line 29 ~ it ~ result",
//         result
//       );
//       // resMock.expects("status").once().withArgs(HttpCode.NO_CONTENT);
//       // resMock.expects("send").once().withArgs({ status: HttpCode.NO_CONTENT });
//       // assert.deepStrictEqual(result, HttpCode.NO_CONTENT);
//       // expect(ContactsService).toHaveBeenCalled();
//       // expect(result).toBeDefined(); // должен быть определен
//       // expect(result).toHaveProperty("status", 200); // проверка приходящих свойств. первым свойство, вторым - чему должно быть равно
//       // expect(result).toHaveProperty("data");
//     });
//   });
// });
