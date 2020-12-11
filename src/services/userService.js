const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const EmailService = require("./emailService");

const { UsersRepository } = require("../repo");

require("dotenv").config();

const avatarGenerator = require("../helpers/avatar-generator");

class UsersService {
  constructor() {
    this.emailService = new EmailService();
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async addUser(body) {
    const verificationToken = uuidv4();
    const { name, email } = body;

    try {
      await this.emailService.sendEmail(name, email, verificationToken);
    } catch (error) {
      console.log("Error", error);
    }
    body.avatar = await avatarGenerator(body.email);

    const pathToAvatar = await path.join(
      process.cwd(),
      process.env.TEMP_DIR,
      `${body.email}.png`
    );
    const IMG_DIR = path.join(process.cwd(), "public", "images");

    const user = await this.repositories.users.addUser({
      ...body,
      verificationToken,
    });

    await fs.rename(pathToAvatar, path.join(IMG_DIR, `${body.email}.png`));

    return user;
  }
  async getByEmail(email) {
    const user = await this.repositories.users.getUser(email, "email");
    return user;
  }
  async getById(id) {
    const user = await this.repositories.users.getUser(id, "_id");
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
    await fs.rename(pathToTempAvatar, prevAvatar);
    return avatarUrl;
  }
}

module.exports = UsersService;
