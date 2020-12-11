const User = require("../schema/usersSchema.js");
const { hash } = require("../helpers/pass.js");

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async getUser(value, target) {
    const user = await this.model.findOne({ [target]: value });
    return user;
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
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
  async verify(id) {
    await this.model.findByIdAndUpdate(
      { _id: id },
      { isVerify: true, verificationToken: null }
    );
    return;
  }
}

module.exports = UsersRepository;
