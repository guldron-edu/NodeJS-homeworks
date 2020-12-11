const Avatar = require("avatar-builder");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const avatar = Avatar.githubBuilder(128);

const avatarGenerator = async (name) => {
  try {
    const avatarUrl = `${process.env.DEFAULT_LINK}/${name}.png`;
    const pathToAvatar = await path.join(
      process.cwd(),
      process.env.TEMP_DIR,
      `${name}.png`
    );

    const newAvatar = await avatar.create(`${name}`);
    await fs.writeFileSync(pathToAvatar, newAvatar);
    return avatarUrl;
  } catch (error) {
    return error;
  }
};
// const avatarGenerator = (name) => {
//   const pathToAvatar = path.join(
//     process.cwd(),
//     process.env.TEMP_DIR,
//     `${name}.png`
//   );
//   const avatarUrl = `${process.env.DEFAULT_LINK}/${name}.png`;
//   avatar
//     .create(`${name}`)
//     .then((newAvatar) => fs.writeFileSync(pathToAvatar, newAvatar));
//   return avatarUrl;
// };

module.exports = avatarGenerator;
