const User = require("../schema/usersSchema.js");
const { hash } = require("../helpers/pass.js");

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async getById(id) {
    const user = await this.model.findOne({ _id: id });
    return user;
  }

  async getByEmail(email) {
    const user = await this.model.findOne({ email });
    return user;
  }

  async updateToken(id, token) {
    console.log(
      "🚀 ~ file: usersRepository.js ~ line 20 ~ UsersRepository ~ updateToken ~ token",
      token
    );
    console.log(
      "🚀 ~ file: usersRepository.js ~ line 20 ~ UsersRepository ~ updateToken ~ id",
      id
    );
    console.log("+++Repo");

    await this.model.updateOne({ _id: id }, { token });
    console.log("+++RepoAfter");

    return;
  }

  async addUser(body) {
    const user = new this.model(body);
    user.password = await hash(user.password);
    return user.save();
  }

  async updateSub(userSub, id) {
    const user = await this.model.findByIdAndUpdate(
      { _id: id },
      { subscription: userSub },
      { new: true }
    );
    return user;
  }
}

module.exports = UsersRepository;
