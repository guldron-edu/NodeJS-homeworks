const { program } = require("commander");

program
  .option("-t, --task <type>", "type of action")
  .option("-id, --id [type]", "contacts ID")
  .option("-u, --user [type]", "user name")
  .option("-e, --email [type]", "email")
  .option("-p, --phone [type]", "phone");

module.exports = program;
