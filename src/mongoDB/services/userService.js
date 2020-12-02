const { UsersRepository } = require("../repo");
require("dotenv").config();

class UsersService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  addUser(body) {
    const user = this.repositories.users.addUser(body);
    return user;
  }
  getByEmail(email) {
    const user = this.repositories.users.getByEmail(email);
    return user;
  }
  getById(id) {
    const user = this.repositories.users.getById(id);
    return user;
  }

  updateSub(userSub, id) {
    const user = this.repositories.users.updateSub(userSub, id);
    return user;
  }
}

module.exports = UsersService;
