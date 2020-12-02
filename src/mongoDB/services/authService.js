const { UsersRepository } = require("../repo");
const jwt = require("jsonwebtoken");

const { check } = require("../helpers/pass.js");
require("dotenv").config();

const S_KEY = process.env.JWT_KEY;

class AuthService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }
  async login(email, password) {
    const user = await this.repositories.users.getByEmail(email);
    // const checkPass = user ? await user.validPassword(password) : null;
    const checkPass = user ? await check(password, user.password) : null;

    if (!user || !checkPass) {
      return null;
    }
    const id = user.id;

    const payload = { id };
    const token = jwt.sign(payload, S_KEY, { expiresIn: "24h" });

    await this.repositories.users.updateToken(id, token);
    return { user, token };
  }
  logout(userId) {
    const data = this.repositories.users.updateToken(userId, null);
    return data;
  }
}

module.exports = AuthService;
