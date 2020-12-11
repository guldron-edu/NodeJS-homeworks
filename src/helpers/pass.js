const bcrypt = require("bcryptjs");
const SALT_FACTOR = 6;

const hash = async (password) => {
  return await bcrypt.hash(password, bcrypt.genSaltSync(SALT_FACTOR));
};

const check = async (pass, hashPass) => {
  return bcrypt.compareSync(pass, hashPass);
};

module.exports = { hash, check };
