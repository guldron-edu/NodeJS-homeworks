const contacts = require("./contacts.js");
const program = require("./utils/commander.js");

program.parse(process.argv);

function invokeAction({ task, id, user, email, phone }) {
  switch (task) {
    case "list":
      contacts.listContacts();
      break;
    case "get":
      contacts.getContactById(id);
      break;
    case "add":
      contacts.addContact(`${user}`, `${email}`, `${phone}`);
      break;
    case "remove":
      contacts.removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!\x1b[0m");
  }
}

invokeAction(program.opts());
