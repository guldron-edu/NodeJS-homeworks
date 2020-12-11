const multer = require("multer");
const path = require("path");
require("dotenv").config();

const TEMP_DIR = path.join(process.cwd(), process.env.TEMP_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
}); // через зарятую свойства аплоада можно добавлять

module.exports = upload;
