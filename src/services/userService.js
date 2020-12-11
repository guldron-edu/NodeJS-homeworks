const { UsersRepository } = require("../repo");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
require("dotenv").config();

const avatarGenerator = require("../helpers/avatar-generator");

class UsersService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async addUser(body) {
    body.avatar = await avatarGenerator(body.email);

    const user = await this.repositories.users.addUser(body);
    const pathToAvatar = await path.join(
      process.cwd(),
      process.env.TEMP_DIR,
      `${body.email}.png`
    );
    const IMG_DIR = path.join(process.cwd(), "public", "images");

    await fs.rename(pathToAvatar, path.join(IMG_DIR, `${body.email}.png`));

    return user;
  }
  async getByEmail(email) {
    const user = await this.repositories.users.getByEmail(email);
    return user;
  }
  async getById(id) {
    const user = await this.repositories.users.getById(id);
    return user;
  }

  async updateSub(userSub, id) {
    const user = await this.repositories.users.updateSub(userSub, id);
    return user;
  }
  async updateAvatar(email, pathToTempAvatar) {
    const IMG_DIR = path.join(process.cwd(), "public", "images");
    const prevAvatar = await path.join(IMG_DIR, `${email}.png`);
    const avatarUrl = `${process.env.DEFAULT_LINK}/${email}.png`;

    const img = await Jimp.read(pathToTempAvatar);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathToTempAvatar);
    // if (prevAvatar) {
    //   await fs.unlink(prevAvatar);
    // }
    await fs.rename(pathToTempAvatar, prevAvatar);
    return avatarUrl;
  }
}

module.exports = UsersService;
