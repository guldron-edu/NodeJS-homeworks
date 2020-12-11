const app = require("./app.js");
const database = require("./database/db.js");
require("dotenv").config();
const path = require("path");

const TEMP_DIR = path.join(process.cwd(), process.env.TEMP_DIR);

const createFolderIfNotExist = require("./helpers/createTempFolder.js");

const PORT = process.env.PORT || 3000;

database
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderIfNotExist(TEMP_DIR);
      console.log(`Use port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Something wrong. Error message: ${err.message}`);
  });
