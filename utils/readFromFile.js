const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve(__dirname, "../db/contacts.json");

const readFile = () => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(contactsPath, (err, data) => {
      if (err) {
        return reject({ err });
      }
      const contactsList = JSON.parse(data.toString());
      return resolve(contactsList);
    });
  });
  return promise;
};

module.exports = readFile;
