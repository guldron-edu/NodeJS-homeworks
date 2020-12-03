const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve(__dirname, "../db/contacts.json");

const writeToFile = (newContactList) =>
  fs.writeFile(contactsPath, `${JSON.stringify(newContactList)}`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`\x1B[32m Contacts updated successfully!!\x1b[0m`);
  });

module.exports = writeToFile;
