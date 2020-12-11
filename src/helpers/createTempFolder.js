const fs = require("fs").promises;

const isAccesible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folder) => {
  try {
    if (!(await isAccesible(folder))) {
      await fs.mkdir(folder);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = createFolderIfNotExist;
